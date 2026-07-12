/* Bearness First Aid - offline app logic. No frameworks, no network. */
(function () {
  "use strict";

  var STORAGE_KEY = "wfa_data_v1";
  var RECENT_KEY = "wfa_recent_v1";

  // ---- State ---------------------------------------------------------------
  var state = {
    data: null,
    tab: "assessment",
    detail: null, // { type: 'injury'|'assessment', id }
    editing: false,
    editMode: false,
    injuryView: "category", // 'category' | 'az'
    query: ""
  };

  var view = document.getElementById("view");
  var searchInput = document.getElementById("search-input");
  var searchClear = document.getElementById("search-clear");
  var recentEl = document.getElementById("recent");
  var editModeBar = document.getElementById("edit-mode-bar");
  var editDone = document.getElementById("edit-done");
  var toastEl = document.getElementById("toast");

  // Shared header burger menu (markup + open/close live in ../menu.js).
  WFA.mountMenu({ mount: "menu-mount", base: "../", appActions: true });
  var editToggle = document.getElementById("edit-toggle");
  var dataToggle = document.getElementById("data-toggle");

  // ---- Data load / persist -------------------------------------------------
  function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function loadData() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }
    if (stored) {
      try {
        var parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.injuries)) {
          if (!Array.isArray(parsed.assessments)) parsed.assessments = deepClone(window.WFA_DEFAULT_DATA.assessments);
          if (!Array.isArray(parsed.concepts)) parsed.concepts = deepClone(window.WFA_DEFAULT_DATA.concepts);
          return parsed;
        }
      } catch (e) { /* fall through */ }
    }
    return deepClone(window.WFA_DEFAULT_DATA);
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch (e) {
      toast("Could not save (storage full or blocked).");
    }
  }

  function resetToDefaults() {
    state.data = deepClone(window.WFA_DEFAULT_DATA);
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
  }

  // ---- Helpers -------------------------------------------------------------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") {
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else if (attrs[k] === true) node.setAttribute(k, "");
        else if (attrs[k] !== false && attrs[k] != null) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  function highlight(text, query) {
    var safe = escapeHtml(text);
    if (!query) return safe;
    var re = new RegExp("(" + escapeReg(query) + ")", "ig");
    return safe.replace(re, "<mark>$1</mark>");
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.hidden = true; }, 2200);
  }

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || ("id-" + Date.now());
  }

  function uniqueInjuryId(base) {
    var id = slugify(base), n = 1;
    var ids = state.data.injuries.map(function (i) { return i.id; });
    while (ids.indexOf(id) !== -1) { id = slugify(base) + "-" + (++n); }
    return id;
  }

  function linesToArray(text) {
    return text.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
  }

  // ---- Rendering: top-level ------------------------------------------------
  function render() {
    // header edit button reflects mode
    editToggle.setAttribute("aria-pressed", state.editMode ? "true" : "false");
    editToggle.textContent = state.editMode ? "Done editing" : "Edit content";
    editModeBar.hidden = !state.editMode;

    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.getAttribute("data-tab") === state.tab);
    });

    view.innerHTML = "";

    if (state.detail) { renderDetail(); return; }
    if (state.query.trim()) { renderSearch(); return; }

    if (state.tab === "injuries") renderInjuriesList();
    else if (state.tab === "assessment") renderTopicList("assessment");
    else if (state.tab === "concepts") renderTopicList("concept");
    else if (state.tab === "data") renderDataTab();
  }

  // ---- Injuries list -------------------------------------------------------
  function renderInjuriesList() {
    var frag = document.createDocumentFragment();

    if (state.editMode) {
      frag.appendChild(el("button", {
        class: "btn btn-primary add-fab",
        onclick: function () { openInjuryEditor(null); }
      }, ["+ Add injury / trauma"]));
    }

    frag.appendChild(injuryViewToggle());

    if (state.injuryView === "az") renderInjuriesAZ(frag);
    else renderInjuriesByCategory(frag);

    view.appendChild(frag);
  }

  function injuryViewToggle() {
    function segBtn(label, mode) {
      return el("button", {
        class: state.injuryView === mode ? "active" : "",
        onclick: function () {
          if (state.injuryView !== mode) { state.injuryView = mode; render(); }
        }
      }, [label]);
    }
    return el("div", { class: "seg" }, [
      segBtn("By category", "category"),
      segBtn("A-Z", "az")
    ]);
  }

  function renderInjuriesByCategory(frag) {
    var byCat = {};
    var order = state.data.categories.slice();
    state.data.injuries.forEach(function (inj) {
      var c = inj.category || "Uncategorized";
      if (!byCat[c]) byCat[c] = [];
      byCat[c].push(inj);
      if (order.indexOf(c) === -1) order.push(c);
    });

    order.sort(function (a, b) { return a.localeCompare(b); });

    order.forEach(function (cat) {
      var list = byCat[cat];
      if (!list || !list.length) return;
      list.sort(function (a, b) { return a.name.localeCompare(b.name); });
      var group = el("div", { class: "category-group" });
      group.appendChild(el("div", { class: "category-title", text: cat }));
      var listWrap = el("div", { class: "list" });
      list.forEach(function (inj) {
        listWrap.appendChild(injuryRow(inj));
      });
      group.appendChild(listWrap);
      frag.appendChild(group);
    });
  }

  function renderInjuriesAZ(frag) {
    var list = state.data.injuries.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    var listWrap = el("div", { class: "list" });
    list.forEach(function (inj) {
      listWrap.appendChild(injuryRow(inj, true));
    });
    frag.appendChild(listWrap);
  }

  function injuryRow(inj, showCategory) {
    var label;
    if (showCategory) {
      label = el("span", { class: "row-stack" }, [
        el("span", {}, [inj.name]),
        el("span", { class: "row-sub", text: inj.category || "Uncategorized" })
      ]);
    } else {
      label = el("span", {}, [inj.name]);
    }
    return el("div", { class: "card" }, [
      el("button", {
        class: "row-btn",
        onclick: function () { openDetail("injury", inj.id); }
      }, [
        label,
        el("span", { class: "chev" }, ["›"])
      ])
    ]);
  }

  // ---- Topic lists (assessments & concepts) --------------------------------
  function topicCollection(type) {
    return type === "concept" ? state.data.concepts : state.data.assessments;
  }
  function topicMeta(type) {
    return type === "concept"
      ? { listTitle: "Glossary", backLabel: "Glossary" }
      : { listTitle: "Patient Assessment", backLabel: "Assessment" };
  }

  function renderTopicList(type) {
    var meta = topicMeta(type);
    var frag = document.createDocumentFragment();
    frag.appendChild(el("div", { class: "category-title", text: meta.listTitle }));
    var listWrap = el("div", { class: "list" });
    var topics = (topicCollection(type) || []).slice();
    // Glossary is browsed by name, so sort A-Z. Assessments keep their logical order.
    if (type === "concept") {
      topics.sort(function (a, b) { return a.title.localeCompare(b.title); });
    }
    topics.forEach(function (topic) {
      listWrap.appendChild(el("div", { class: "card" }, [
        el("button", {
          class: "row-btn",
          onclick: function () { openDetail(type, topic.id); }
        }, [
          el("span", {}, [topic.title]),
          el("span", { class: "chev" }, ["›"])
        ])
      ]));
    });
    frag.appendChild(listWrap);
    view.appendChild(frag);
  }

  // ---- Detail views --------------------------------------------------------
  function openDetail(type, id) {
    if (state.query.trim()) addRecent(state.query);
    if (state.editMode) {
      if (type === "injury") { openInjuryEditor(id); return; }
      openTopicEditor(type, id); return;
    }
    state.detail = { type: type, id: id };
    window.scrollTo(0, 0);
    render();
  }

  function closeDetail() {
    state.detail = null;
    render();
  }

  function renderDetail() {
    if (state.detail.type === "injury") renderInjuryDetail();
    else renderTopicDetail(state.detail.type);
  }

  function backButton(label) {
    return el("button", { class: "detail-back", onclick: closeDetail }, ["‹ " + (label || "Back")]);
  }

  function sectionCard(cls, title, items, inferred) {
    if (!items || !items.length) return null;
    var ul = el("ul", {});
    items.forEach(function (it) { ul.appendChild(el("li", { text: it })); });
    var head = el("div", { class: "section-head " + cls, text: title });
    if (inferred) head.appendChild(el("span", { class: "inferred-badge", text: "inferred" }));
    return el("div", { class: "section" }, [head, ul]);
  }

  // Builds an SVG "assessment pyramid" from a list of tier labels (top -> bottom).
  function pyramidDiagram(diagram) {
    var tiers = (diagram && diagram.tiers) || [];
    if (!tiers.length) return null;

    var padTop = 16, triH = 228, apexX = 90, baseHalf = 72;
    var labelX = apexX + baseHalf + 30;
    var n = tiers.length;
    var bandH = triH / n;

    function halfAt(y) { return baseHalf * ((y - padTop) / triH); }

    var apexY = padTop;
    var baseY = padTop + triH;
    var parts = [];

    parts.push(
      '<defs><linearGradient id="wfaPyr" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#f87171"/>' +
      '<stop offset="1" stop-color="#7f1d1d"/>' +
      '</linearGradient></defs>'
    );

    // Triangle body.
    parts.push(
      '<polygon points="' + apexX + ',' + apexY + ' ' +
      (apexX - baseHalf) + ',' + baseY + ' ' +
      (apexX + baseHalf) + ',' + baseY +
      '" fill="url(#wfaPyr)" stroke="#a91b1b" stroke-width="1.5"/>'
    );

    for (var i = 0; i < n; i++) {
      var yTop = padTop + i * bandH;
      var yMid = yTop + bandH / 2;

      // Divider line (skip above the apex tier).
      if (i > 0) {
        var h = halfAt(yTop);
        parts.push(
          '<line x1="' + (apexX - h) + '" y1="' + yTop + '" x2="' + (apexX + h) +
          '" y2="' + yTop + '" stroke="#ffffff" stroke-width="1.5"/>'
        );
      }

      var xRight = apexX + halfAt(yMid);

      // Connector from the triangle edge to the label.
      parts.push(
        '<line x1="' + xRight + '" y1="' + yMid + '" x2="' + (labelX - 8) +
        '" y2="' + yMid + '" stroke="#94a3b8" stroke-width="1.25"/>'
      );

      // Numbered node at the connector origin.
      parts.push(
        '<circle cx="' + xRight + '" cy="' + yMid + '" r="9" fill="#ffffff" stroke="#a91b1b" stroke-width="1.5"/>' +
        '<text x="' + xRight + '" y="' + yMid + '" text-anchor="middle" dominant-baseline="central" ' +
        'font-size="11" font-weight="700" fill="#a91b1b">' + (i + 1) + '</text>'
      );

      // Tier label.
      parts.push(
        '<text x="' + labelX + '" y="' + yMid + '" dominant-baseline="central" ' +
        'font-size="13" font-weight="600" fill="#0f172a">' + escapeHtml(tiers[i]) + '</text>'
      );
    }

    var svg =
      '<svg viewBox="0 0 460 ' + (baseY + 14) + '" role="img" ' +
      'aria-label="Patient assessment pyramid: ' + escapeHtml(tiers.join(", ")) + '" ' +
      'xmlns="http://www.w3.org/2000/svg">' + parts.join("") + '</svg>';

    return el("div", { class: "diagram", html: svg });
  }

  function renderInjuryDetail() {
    var inj = findInjury(state.detail.id);
    if (!inj) { closeDetail(); return; }
    var frag = document.createDocumentFragment();
    frag.appendChild(backButton(state.query.trim() ? "Search" : "Injuries"));
    frag.appendChild(el("h2", { class: "detail-title", text: inj.name }));
    frag.appendChild(el("span", { class: "badge", text: inj.category || "Uncategorized" }));

    var inferred = inj.inferred || [];
    var s = sectionCard("signs", "Signs & Symptoms", inj.signs, inferred.indexOf("signs") !== -1);
    var m = sectionCard("management", "Management / Treatment", inj.management, inferred.indexOf("management") !== -1);
    var n = sectionCard("notes", "Notes", inj.notes);
    [s, m, n].forEach(function (c) { if (c) frag.appendChild(c); });

    if (inferred.length) {
      frag.appendChild(el("div", { class: "inferred-note" }, [
        "Sections marked \u201Cinferred\u201D are general wilderness first-aid guidance added to fill gaps in the original notes - not transcribed from them, and to be verified or replaced."
      ]));
    }

    if (state.editMode) {
      frag.appendChild(el("button", {
        class: "btn btn-secondary", onclick: function () { openInjuryEditor(inj.id); }
      }, ["Edit this injury"]));
    }
    view.appendChild(frag);
  }

  function renderTopicDetail(type) {
    var meta = topicMeta(type);
    var topic = findTopic(type, state.detail.id);
    if (!topic) { closeDetail(); return; }
    var frag = document.createDocumentFragment();
    frag.appendChild(backButton(state.query.trim() ? "Search" : meta.backLabel));
    frag.appendChild(el("h2", { class: "detail-title", text: topic.title }));

    (topic.sections || []).forEach(function (sec) {
      var card = sectionCard("generic", sec.heading, sec.items);
      if (sec.diagram) {
        if (!card) {
          card = el("div", { class: "section" }, [
            el("div", { class: "section-head generic", text: sec.heading })
          ]);
        }
        var diagramNode = pyramidDiagram(sec.diagram);
        if (diagramNode) card.insertBefore(diagramNode, card.querySelector("ul"));
      }
      if (card) frag.appendChild(card);
    });

    if (state.editMode) {
      frag.appendChild(el("button", {
        class: "btn btn-secondary", onclick: function () { openTopicEditor(type, topic.id); }
      }, ["Edit this topic"]));
    }
    view.appendChild(frag);
  }

  function findInjury(id) {
    for (var i = 0; i < state.data.injuries.length; i++) {
      if (state.data.injuries[i].id === id) return state.data.injuries[i];
    }
    return null;
  }
  function findTopic(type, id) {
    var coll = topicCollection(type) || [];
    for (var i = 0; i < coll.length; i++) {
      if (coll[i].id === id) return coll[i];
    }
    return null;
  }

  // ---- Search --------------------------------------------------------------
  function renderSearch() {
    var q = state.query.trim();
    var ql = q.toLowerCase();
    var frag = document.createDocumentFragment();

    // 1. Injuries by name or category
    var nameMatches = state.data.injuries.filter(function (inj) {
      return inj.name.toLowerCase().indexOf(ql) !== -1 ||
        (inj.category || "").toLowerCase().indexOf(ql) !== -1;
    });

    // 2. Injuries by sign/symptom (and management/notes) - with the matching line
    var symptomMatches = [];
    state.data.injuries.forEach(function (inj) {
      if (nameMatches.indexOf(inj) !== -1) return;
      var hitLine = firstMatchingLine(inj.signs, ql) ||
        firstMatchingLine(inj.management, ql) ||
        firstMatchingLine(inj.notes, ql);
      if (hitLine) symptomMatches.push({ inj: inj, line: hitLine });
    });

    // 3. Assessment & concept topics / sections
    function collectTopicMatches(collection) {
      var out = [];
      (collection || []).forEach(function (topic) {
        var line = null;
        if (topic.title.toLowerCase().indexOf(ql) !== -1) line = topic.title;
        if (!line && topic.keywords) {
          for (var k = 0; k < topic.keywords.length; k++) {
            if (topic.keywords[k].toLowerCase().indexOf(ql) !== -1) { line = topic.title; break; }
          }
        }
        if (!line) {
          (topic.sections || []).some(function (sec) {
            var l = firstMatchingLine(sec.items, ql) ||
              (sec.heading.toLowerCase().indexOf(ql) !== -1 ? sec.heading : null);
            if (l) { line = l; return true; }
            return false;
          });
        }
        if (line) out.push({ topic: topic, line: line });
      });
      return out;
    }
    var assessMatches = collectTopicMatches(state.data.assessments);
    var conceptMatches = collectTopicMatches(state.data.concepts);

    if (!nameMatches.length && !symptomMatches.length && !assessMatches.length && !conceptMatches.length) {
      frag.appendChild(el("div", { class: "empty" }, ["No matches for \u201C" + q + "\u201D."]));
      view.appendChild(frag);
      return;
    }

    if (nameMatches.length) {
      frag.appendChild(el("div", { class: "result-section-label", text: "Injuries & categories" }));
      var l1 = el("div", { class: "list" });
      nameMatches.forEach(function (inj) {
        l1.appendChild(resultCard(inj.name, inj.category, q, function () { openDetail("injury", inj.id); }));
      });
      frag.appendChild(l1);
    }

    if (symptomMatches.length) {
      frag.appendChild(el("div", { class: "result-section-label", text: "Matches in symptoms / treatment" }));
      var l2 = el("div", { class: "list" });
      symptomMatches.forEach(function (m) {
        l2.appendChild(resultCard(m.inj.name, m.line, q, function () { openDetail("injury", m.inj.id); }));
      });
      frag.appendChild(l2);
    }

    if (assessMatches.length) {
      frag.appendChild(el("div", { class: "result-section-label", text: "Patient assessment" }));
      var l3 = el("div", { class: "list" });
      assessMatches.forEach(function (m) {
        l3.appendChild(resultCard(m.topic.title, m.line === m.topic.title ? null : m.line, q,
          function () { openDetail("assessment", m.topic.id); }));
      });
      frag.appendChild(l3);
    }

    if (conceptMatches.length) {
      frag.appendChild(el("div", { class: "result-section-label", text: "Glossary" }));
      var l4 = el("div", { class: "list" });
      conceptMatches.forEach(function (m) {
        l4.appendChild(resultCard(m.topic.title, m.line === m.topic.title ? null : m.line, q,
          function () { openDetail("concept", m.topic.id); }));
      });
      frag.appendChild(l4);
    }

    view.appendChild(frag);
  }

  function firstMatchingLine(arr, ql) {
    if (!arr) return null;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].toLowerCase().indexOf(ql) !== -1) return arr[i];
    }
    return null;
  }

  function resultCard(title, context, query, onClick) {
    var inner = [el("span", { html: highlight(title, query) })];
    var body = el("span", {}, inner);
    if (context) {
      body = el("span", {}, [
        el("span", { html: highlight(title, query) }),
        el("span", { class: "match-context", html: highlight(context, query) })
      ]);
      body.style.display = "flex";
      body.style.flexDirection = "column";
    }
    return el("div", { class: "card" }, [
      el("button", { class: "row-btn", onclick: onClick }, [
        body, el("span", { class: "chev" }, ["›"])
      ])
    ]);
  }

  // ---- Injury editor -------------------------------------------------------
  function openInjuryEditor(id) {
    var inj = id ? findInjury(id) : null;
    var isNew = !inj;
    var frag = document.createDocumentFragment();

    frag.appendChild(el("button", {
      class: "detail-back",
      onclick: function () { state.detail = null; render(); }
    }, ["‹ Cancel"]));
    frag.appendChild(el("h2", { class: "detail-title", text: isNew ? "Add injury / trauma" : "Edit: " + inj.name }));

    var nameInput = el("input", { type: "text", value: inj ? inj.name : "", placeholder: "Injury name" });
    frag.appendChild(field("Name", nameInput));

    // Category select with option to add new
    var catSelect = el("select", {});
    state.data.categories.forEach(function (c) {
      catSelect.appendChild(el("option", { value: c, text: c }));
    });
    catSelect.appendChild(el("option", { value: "__new__", text: "+ New category…" }));
    if (inj && state.data.categories.indexOf(inj.category) !== -1) catSelect.value = inj.category;
    else if (state.data.categories.length) catSelect.value = state.data.categories[0];

    var newCatInput = el("input", { type: "text", placeholder: "New category name" });
    newCatInput.style.display = "none";
    newCatInput.style.marginTop = "8px";
    catSelect.addEventListener("change", function () {
      newCatInput.style.display = catSelect.value === "__new__" ? "block" : "none";
    });
    var catWrap = el("div", {}, [catSelect, newCatInput]);
    frag.appendChild(field("Category", catWrap));

    var signsTa = el("textarea", { placeholder: "One sign or symptom per line" });
    signsTa.value = (inj && inj.signs ? inj.signs : []).join("\n");
    frag.appendChild(field("Signs & Symptoms (one per line)", signsTa));

    var mgmtTa = el("textarea", { placeholder: "One step per line" });
    mgmtTa.value = (inj && inj.management ? inj.management : []).join("\n");
    frag.appendChild(field("Management / Treatment (one per line)", mgmtTa));

    var notesTa = el("textarea", { placeholder: "One note per line" });
    notesTa.value = (inj && inj.notes ? inj.notes : []).join("\n");
    frag.appendChild(field("Notes (one per line)", notesTa));

    var saveBtn = el("button", {
      class: "btn btn-primary", onclick: function () {
        var name = nameInput.value.trim();
        if (!name) { toast("Please enter a name."); return; }
        var category = catSelect.value;
        if (category === "__new__") {
          category = newCatInput.value.trim();
          if (!category) { toast("Please enter the new category name."); return; }
          if (state.data.categories.indexOf(category) === -1) state.data.categories.push(category);
        }
        var payload = {
          name: name,
          category: category,
          signs: linesToArray(signsTa.value),
          management: linesToArray(mgmtTa.value),
          notes: linesToArray(notesTa.value)
        };
        if (isNew) {
          payload.id = uniqueInjuryId(name);
          state.data.injuries.push(payload);
          state.detail = { type: "injury", id: payload.id };
        } else {
          inj.name = payload.name; inj.category = payload.category;
          inj.signs = payload.signs; inj.management = payload.management; inj.notes = payload.notes;
          state.detail = { type: "injury", id: inj.id };
        }
        persist();
        toast("Saved.");
        render();
      }
    }, ["Save"]);

    var btnRow = el("div", { class: "btn-row" }, [saveBtn]);
    if (!isNew) {
      btnRow.appendChild(el("button", {
        class: "btn btn-danger", onclick: function () {
          if (!confirm("Delete \u201C" + inj.name + "\u201D? This cannot be undone.")) return;
          state.data.injuries = state.data.injuries.filter(function (x) { return x.id !== inj.id; });
          state.detail = null;
          persist();
          toast("Deleted.");
          render();
        }
      }, ["Delete"]));
    }
    frag.appendChild(btnRow);

    state.detail = { type: "editor" };
    view.innerHTML = "";
    view.appendChild(frag);
    window.scrollTo(0, 0);
  }

  // ---- Assessment editor ---------------------------------------------------
  function assessmentToText(topic) {
    var lines = [];
    (topic.sections || []).forEach(function (sec) {
      lines.push("# " + sec.heading);
      (sec.items || []).forEach(function (it) { lines.push(it); });
      lines.push("");
    });
    return lines.join("\n").trim();
  }

  function textToSections(text) {
    var sections = [];
    var current = null;
    text.split("\n").forEach(function (raw) {
      var line = raw.replace(/\s+$/, "");
      if (/^#\s+/.test(line)) {
        current = { heading: line.replace(/^#\s+/, "").trim(), items: [] };
        sections.push(current);
      } else if (line.trim()) {
        if (!current) { current = { heading: "", items: [] }; sections.push(current); }
        current.items.push(line.trim());
      }
    });
    return sections;
  }

  function openTopicEditor(type, id) {
    var topic = findTopic(type, id);
    if (!topic) { closeDetail(); return; }
    var frag = document.createDocumentFragment();
    frag.appendChild(el("button", {
      class: "detail-back", onclick: function () { state.detail = null; render(); }
    }, ["‹ Cancel"]));
    frag.appendChild(el("h2", { class: "detail-title", text: "Edit: " + topic.title }));

    var titleInput = el("input", { type: "text", value: topic.title });
    frag.appendChild(field("Title", titleInput));

    var bodyTa = el("textarea", {});
    bodyTa.style.minHeight = "300px";
    bodyTa.value = assessmentToText(topic);
    frag.appendChild(field("Content", bodyTa));
    frag.appendChild(el("div", { class: "hint" },
      ["Lines starting with \u201C# \u201D are section headings. All other lines are bullet points."]));

    frag.appendChild(el("div", { class: "btn-row" }, [
      el("button", {
        class: "btn btn-primary", onclick: function () {
          topic.title = titleInput.value.trim() || topic.title;
          // Preserve non-text extras (e.g. diagrams) by matching on heading.
          var priorDiagrams = {};
          (topic.sections || []).forEach(function (sec) {
            if (sec.diagram) priorDiagrams[sec.heading] = sec.diagram;
          });
          topic.sections = textToSections(bodyTa.value);
          topic.sections.forEach(function (sec) {
            if (priorDiagrams[sec.heading]) sec.diagram = priorDiagrams[sec.heading];
          });
          state.detail = { type: type, id: topic.id };
          persist();
          toast("Saved.");
          render();
        }
      }, ["Save"])
    ]));

    state.detail = { type: "editor" };
    view.innerHTML = "";
    view.appendChild(frag);
    window.scrollTo(0, 0);
  }

  function field(label, control) {
    return el("div", { class: "edit-field" }, [
      el("label", { text: label }), control
    ]);
  }

  // ---- Data tab ------------------------------------------------------------
  function renderDataTab() {
    var frag = document.createDocumentFragment();

    frag.appendChild(el("button", {
      class: "detail-back",
      onclick: function () { state.tab = "assessment"; window.scrollTo(0, 0); render(); }
    }, ["‹ Back"]));

    var counts = el("p", {}, [
      state.data.injuries.length + " injuries · " +
      state.data.categories.length + " categories · " +
      state.data.assessments.length + " assessment topics · " +
      (state.data.concepts ? state.data.concepts.length : 0) + " glossary entries"
    ]);

    // Backup
    var backup = el("div", { class: "data-block" }, [
      el("h2", {}, ["Backup / export"]),
      el("p", {}, ["Save a copy of all your data (including edits) as a JSON file."]),
      el("div", { class: "btn-row" }, [
        el("button", { class: "btn btn-primary", onclick: exportData }, ["Export JSON"])
      ])
    ]);

    // Restore
    var fileInput = el("input", { type: "file", accept: "application/json,.json" });
    fileInput.style.display = "none";
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      if (f) importData(f);
    });
    var restore = el("div", { class: "data-block" }, [
      el("h2", {}, ["Restore / import"]),
      el("p", {}, ["Load data from a previously exported JSON file. This replaces current data."]),
      el("div", { class: "btn-row" }, [
        el("button", { class: "btn btn-secondary", onclick: function () { fileInput.click(); } }, ["Import JSON"])
      ]),
      fileInput
    ]);

    // Reset
    var reset = el("div", { class: "data-block" }, [
      el("h2", {}, ["Reset"]),
      el("p", {}, ["Discard all edits and restore the original course notes."]),
      el("div", { class: "btn-row" }, [
        el("button", {
          class: "btn btn-danger", onclick: function () {
            if (!confirm("Discard all edits and reset to the original notes?")) return;
            resetToDefaults();
            toast("Reset to original notes.");
            render();
          }
        }, ["Reset to original"])
      ])
    ]);

    var about = el("div", { class: "data-block" }, [
      el("h2", {}, ["About"]),
      el("p", {}, ["Offline reference from a Wilderness First Aid course. Works with no internet. " +
        "This is a study aid, not medical advice \u2014 in a real emergency call for professional help."])
    ]);

    frag.appendChild(el("div", { class: "category-title", text: "Your data" }));
    frag.appendChild(counts);
    frag.appendChild(backup);
    frag.appendChild(restore);
    frag.appendChild(reset);
    frag.appendChild(about);
    view.appendChild(frag);
  }

  function exportData() {
    var blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = el("a", { href: url, download: "wfa-data.json" });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function importData(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        if (!parsed || !Array.isArray(parsed.injuries)) throw new Error("bad");
        if (!Array.isArray(parsed.categories)) parsed.categories = [];
        if (!Array.isArray(parsed.assessments)) parsed.assessments = [];
        if (!Array.isArray(parsed.concepts)) parsed.concepts = [];
        state.data = parsed;
        persist();
        toast("Imported.");
        render();
      } catch (e) {
        toast("That file isn't valid WFA data.");
      }
    };
    reader.readAsText(file);
  }

  // ---- Events --------------------------------------------------------------
  document.querySelectorAll(".tab").forEach(function (t) {
    t.addEventListener("click", function () {
      state.tab = t.getAttribute("data-tab");
      state.detail = null;
      state.query = "";
      searchInput.value = "";
      searchClear.hidden = true;
      window.scrollTo(0, 0);
      render();
    });
  });

  // ---- Recent searches -----------------------------------------------------
  function loadRecent() {
    try { var r = JSON.parse(localStorage.getItem(RECENT_KEY)); return Array.isArray(r) ? r : []; }
    catch (e) { return []; }
  }
  function saveRecent(arr) {
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function addRecent(term) {
    term = (term || "").trim();
    if (!term) return;
    var arr = loadRecent().filter(function (t) { return t.toLowerCase() !== term.toLowerCase(); });
    arr.unshift(term);
    if (arr.length > 8) arr = arr.slice(0, 8);
    saveRecent(arr);
  }
  function hideRecent() { recentEl.hidden = true; }
  function showRecent() {
    var q = searchInput.value.trim().toLowerCase();
    var arr = loadRecent();
    if (q) {
      arr = arr.filter(function (t) {
        var lt = t.toLowerCase();
        return lt.indexOf(q) === 0 && lt !== q;
      });
    }
    if (!arr.length) { hideRecent(); return; }
    recentEl.innerHTML = "";
    recentEl.appendChild(el("div", { class: "recent-head" }, [
      el("span", { text: "Recent" }),
      el("button", {
        class: "recent-clear",
        onclick: function (e) { e.stopPropagation(); saveRecent([]); hideRecent(); }
      }, ["Clear"])
    ]));
    arr.forEach(function (term) {
      recentEl.appendChild(el("div", { class: "recent-item" }, [
        el("button", { class: "recent-term", onclick: function () { runSearch(term); } }, [term]),
        el("button", {
          class: "recent-del", "aria-label": "Remove",
          onclick: function (e) {
            e.stopPropagation();
            saveRecent(loadRecent().filter(function (t) { return t !== term; }));
            showRecent();
          }
        }, ["\u00D7"])
      ]));
    });
    recentEl.hidden = false;
  }
  function runSearch(term) {
    searchInput.value = term;
    state.query = term;
    searchClear.hidden = !term;
    state.detail = null;
    hideRecent();
    render();
    searchInput.blur();
  }

  searchInput.addEventListener("input", function () {
    state.query = searchInput.value;
    searchClear.hidden = !state.query;
    state.detail = null;
    showRecent();
    render();
  });
  searchInput.addEventListener("focus", function () { showRecent(); });
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && searchInput.value.trim()) { addRecent(searchInput.value); hideRecent(); }
    else if (e.key === "Escape") { hideRecent(); }
  });
  searchClear.addEventListener("click", function () {
    state.query = "";
    searchInput.value = "";
    searchClear.hidden = true;
    render();
    searchInput.focus();
    showRecent();
  });
  document.addEventListener("click", function (e) {
    if (!recentEl.hidden && !e.target.closest(".search-wrap")) hideRecent();
  });

  editToggle.addEventListener("click", function () {
    state.editMode = !state.editMode;
    if (state.detail && state.detail.type === "editor") state.detail = null;
    render();
  });

  editDone.addEventListener("click", function () {
    state.editMode = false;
    if (state.detail && state.detail.type === "editor") state.detail = null;
    render();
  });

  dataToggle.addEventListener("click", function () {
    state.tab = "data";
    state.detail = null;
    state.query = "";
    searchInput.value = "";
    searchClear.hidden = true;
    window.scrollTo(0, 0);
    render();
  });

  // ---- Service worker (only helps when served over http/https) -------------
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("../sw.js").catch(function () { });
    });
  }

  // ---- Boot ----------------------------------------------------------------
  state.data = loadData();
  // Deep links from the shared menu on other pages (e.g. install page).
  if (location.hash === "#edit") {
    state.editMode = true;
  } else if (location.hash === "#data") {
    state.tab = "data";
  }
  render();
})();
