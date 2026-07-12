/* Bearness First Aid - shared header burger menu.
   Reusable across the landing page, install page and the guide so the menu
   markup, styling and open/close logic live in one place. No frameworks. */
(function (global) {
  "use strict";

  var STYLE_ID = "wfa-menu-style";
  var CSS = [
    ".header-actions{display:flex;align-items:center;gap:8px;position:relative;margin-left:auto}",
    ".menu-btn{background:none;border:none;color:#fff;font-size:1.7rem;line-height:1;padding:2px 6px;cursor:pointer}",
    ".menu{position:absolute;top:calc(100% + 8px);right:0;min-width:200px;background:#fff;",
    "border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 10px 28px rgba(0,0,0,.18);",
    "padding:6px;z-index:30;display:flex;flex-direction:column}",
    ".menu[hidden]{display:none}",
    ".menu-item{display:block;width:100%;text-align:left;background:none;border:none;",
    "padding:11px 12px;font-size:.95rem;font-weight:600;color:#0f172a;border-radius:8px;",
    "cursor:pointer;text-decoration:none;font-family:inherit}",
    ".menu-item:hover,.menu-item:active{background:#f1f5f9}"
  ].join("");

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function itemHtml(item) {
    if (item.href) {
      return '<a class="menu-item" role="menuitem" href="' + item.href + '">' +
        item.label + "</a>";
    }
    return '<button class="menu-item" role="menuitem" type="button" id="' + item.id + '"' +
      (item.pressed ? ' aria-pressed="false"' : "") + ">" + item.label + "</button>";
  }

  /*
   * mountMenu(options)
   *   mount:      element or element id to render the menu into
   *   base:       relative path prefix to the site root ("" for root pages,
   *               "../" for the guide under /app/)
   *   appActions: when true, "Edit content" and "Data & backup" render as
   *               buttons (#edit-toggle / #data-toggle) for the caller to wire.
   *               When false, they render as links into the guide that trigger
   *               the same actions via a URL hash (#edit / #data).
   */
  function mountMenu(opts) {
    opts = opts || {};
    var base = opts.base || "";
    var mount = typeof opts.mount === "string"
      ? document.getElementById(opts.mount) : opts.mount;
    if (!mount) return null;

    injectStyles();

    var guideHref = base + "app/index.html";
    var items = [
      { label: "About / Home", href: base + "index.html" },
      opts.appActions
        ? { label: "Edit content", id: "edit-toggle", pressed: true }
        : { label: "Edit content", href: guideHref + "#edit" },
      { label: "Install &amp; use offline", href: base + "install.html" },
      opts.appActions
        ? { label: "Data &amp; backup", id: "data-toggle" }
        : { label: "Data &amp; backup", href: guideHref + "#data" }
    ];

    mount.classList.add("header-actions");
    mount.innerHTML =
      '<button id="menu-toggle" class="menu-btn" aria-haspopup="true" ' +
      'aria-expanded="false" aria-label="Menu" title="Menu">\u2630</button>' +
      '<div id="menu" class="menu" role="menu" hidden>' +
      items.map(itemHtml).join("") +
      "</div>";

    var toggle = mount.querySelector("#menu-toggle");
    var menu = mount.querySelector("#menu");

    function close() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = menu.hidden;
      menu.hidden = !willOpen;
      toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
    menu.addEventListener("click", function () { close(); });
    document.addEventListener("click", function (e) {
      if (!menu.hidden && !menu.contains(e.target) && e.target !== toggle) close();
    });

    return { toggle: toggle, menu: menu, close: close };
  }

  global.WFA = global.WFA || {};
  global.WFA.mountMenu = mountMenu;
})(window);
