const CACHE_NAME = 'touch-the-sky-v2'; // Incremented version because data is now bundled
const ASSETS = [
  './',
  './index.html',
  './icon.svg',
  './manifest.json',
];

// Install Service Worker
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force the new service worker to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activation logic: Cleanup old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Stale-while-revalidate strategy (Best for high-tech apps: speed + freshness)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((response) => {
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          // Only cache successful GET requests
          if (e.request.method === 'GET' && networkResponse.ok) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        });
        // Return cached response immediately if available, otherwise wait for network
        return response || fetchPromise;
      });
    })
  );
});