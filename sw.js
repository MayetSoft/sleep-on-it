// Offline cache for the whole suite. Bump CACHE whenever any file changes.
const CACHE = "sleep-on-it-v4";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "games/ants/",
  "games/ants/index.html",
  "games/ants/icon.png",
  "games/opossums/",
  "games/opossums/index.html",
  "games/opossums/icon.png",
  "games/garden/",
  "games/garden/index.html",
  "games/garden/icon.png",
  "games/mowing/",
  "games/mowing/index.html",
  "games/mowing/icon.png",
  "games/embers/",
  "games/embers/index.html",
  "games/embers/icon.png",
  "games/ink/",
  "games/ink/index.html",
  "games/ink/icon.png",
  "games/rain/",
  "games/rain/index.html",
  "games/rain/icon.png",
  "games/drifts/",
  "games/drifts/index.html",
  "games/drifts/icon.png",
  "games/paint/",
  "games/paint/index.html",
  "games/paint/icon.png",
  "games/ants/pictures/base.js",
  "games/ants/pictures/set-01.js",
  "games/ants/pictures/set-02.js",
  "games/ants/pictures/set-03.js",
  "games/ants/pictures/set-04.js",
  "games/ants/pictures/set-05.js",
  "games/ants/pictures/set-06.js",
  "games/ants/pictures/set-07.js",
  "games/ants/pictures/set-08.js",
  "games/ants/pictures/set-09.js",
  "games/ants/pictures/set-10.js",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
