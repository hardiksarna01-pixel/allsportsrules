const CACHE_NAME = 'sportdecoded-v1';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then(r => {
      const clone = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
      return r;
    }).catch(() => caches.match(event.request).then(r => r || caches.match('/')))
  );
});
