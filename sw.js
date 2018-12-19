self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/index.html',
                '/script.js'
            ]);
        })
    );
});


// cache or network
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        console.log('SW FETCH : ', event.request.url);
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return {
                    offline: true,
                    cache: false
                };
            });
        }
    }));
});





// push notification
self.addEventListener('push', function (event) {
    const payload = event.data ? event.data.text() : 'no payload';
    console.log('sw push :', payload);
    event.waitUntil(
        self.registration.showNotification('SW-TEST', {
            body: payload,
        })
    );
});