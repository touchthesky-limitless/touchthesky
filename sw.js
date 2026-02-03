const CACHE_NAME = 'touch-the-sky-v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './icon.svg',
  './manifest.json',
  './data/data.json',
  './data/banks.json'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Network-first strategy (Fetch fresh data, fallback to cache)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});