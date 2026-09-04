/**
 * NANYANG ARTISTS SOCIETY — PRODUCTION PWA SERVICE WORKER
 * Cache Version: v2.4.0
 * Cache Strategy: Stale-While-Revalidate for Static Assets, Network-First for API/CMS.
 */

const CACHE_NAME = 'nas-static-cache-v2.5.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './about.html',
  './courses.html',
  './course-detail.html',
  './grade.html',
  './grade-detail.html',
  './nanyang-star.html',
  './gallery.html',
  './artwork.html',
  './news-events.html',
  './article.html',
  './contact.html',
  './css/main.css',
  './css/components.css',
  './js/core/app.js',
  './js/services/db.js',
  './js/services/i18n.js',
  './assets/logo/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. API Calls & Admin CMS: Network-First (Never serve stale CMS data)
  if (url.pathname.includes('/admin/') || url.search.includes('action=') || request.method !== 'GET') {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify({
          success: false,
          error: "You are currently offline. Please reconnect to sync latest live data.",
          code: "OFFLINE_503"
        }), { headers: { 'Content-Type': 'application/json' } });
      })
    );
    return;
  }

  // 2. Static Assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
