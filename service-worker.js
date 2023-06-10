self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
          'close.png',
          'download.png',
          'explore.mp4',
          'facebook.png',
          'logo.jpg',
          'logo.png',
          'logoblack.png',
          'Logowhite.png',
          'main.css',
          'manifest.json',
          'menu.svg',
          'style.css',
          'x.svg'
          // Add more assets to cache as needed
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    if (event.request.url.endsWith('/index.html')) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request).then(function(fetchResponse) {
            var clonedResponse = fetchResponse.clone();
            caches.open('my-cache').then(function(cache) {
              cache.put(event.request, clonedResponse);
            });
            return fetchResponse;
          });
        })
      );
    }
    // ... Handle other requests for assets, stylesheets, images, etc.
  });

  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      // Perform any necessary activation tasks
      // such as cleaning up old caches or other resources
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // Filter out the caches you want to delete
            // For example, you can delete all caches except the current one
            return cacheName !== 'my-cache';
          }).map(function(cacheName) {
            // Delete the caches
            return caches.delete(cacheName);
          })
        );
      })
    );
  });