const cacheVersion = 'v1.0.0';
const cacheURLs = [
  'css/index.css',
  'css/result.css',
  'css/root.css',
  'icons/256.png',
  'js/clipboard.min.js',
  'js/index.js',
  'js/rem.js',
  'js/result.js',
  'js/root.js',
  'favicon.png',
  'index.html',
  'manifest.json',
  'result.html',
  './',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheVersion).then(function (cache) {
      return cache.addAll(cacheURLs);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== cacheVersion) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
