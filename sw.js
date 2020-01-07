const staticAssets = [
    './offline.html',
    './manifest.json',
    './style.css',
    './w3.css',
    './w3-theme-red.css',
    './sw.js',
    './icon.png',
    './144.png',
    './icon-512.png',
    './nophoto.png'
];

self.addEventListener('install', async event => {
  const cache = await caches.open('static-cache');
  cache.addAll(staticAssets);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
