/* Service worker: cache the app shell so it works fully offline once loaded.
   Only active when the app is served over http(s) (e.g. GitHub Pages). */
var CACHE = "wfa-cache-v1";
var ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Add individually so one missing optional asset (e.g. png icons) doesn't fail install.
      return Promise.all(ASSETS.map(function (url) {
        return c.add(url).catch(function () { return null; });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) return cached;
      return fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); }).catch(function () {});
        return res;
      }).catch(function () {
        return caches.match("./index.html");
      });
    })
  );
});
