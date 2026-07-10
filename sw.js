/* Service worker for the whole site (landing page + app).
   Served from the site root so its scope covers both "./" (landing) and
   "./app/" (the guide), letting everything work fully offline once loaded. */
var CACHE = "wfa-cache-v22";
var ASSETS = [
    "./",
    "./index.html",
    "./install.html",
    "./manifest.webmanifest",
    "./app/",
    "./app/index.html",
    "./app/styles.css",
    "./app/app.js",
    "./app/data.js",
    "./app/icons/icon-192.png",
    "./app/icons/icon-512.png",
    "./app/icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(CACHE).then(function (c) {
            // Add individually so one missing optional asset doesn't fail install.
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
                caches.open(CACHE).then(function (c) { c.put(e.request, copy); }).catch(function () { });
                return res;
            }).catch(function () {
                // Offline fallback for navigations.
                if (e.request.mode === "navigate") return caches.match("./index.html");
            });
        })
    );
});
