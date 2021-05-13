const version = '0.0.1';
const cacheName = `minimal-bible-${version}`;

self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll([
          `/`,
          `/assets/css/styles.css`,
          `/assets/css/print.css`,
          `/assets/js/vue.js`,
          `/assets/js/scripts.js`,
          `/read/chapters.json`,
          `/read/books.json`,
          `/read/Genesis+1/`
        ])
            .then(() => self.skipWaiting());
      })
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }

    event.respondWith(
      caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
        return response || fetch(event.request);
      })
    );
  });