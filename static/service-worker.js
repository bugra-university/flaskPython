const CACHE_VERSION = 2; // Update this version number for new changes
const CACHE_NAME = `todo-app-cache-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `todo-app-dynamic-cache-v${CACHE_VERSION}`;
const urlsToCache = [
    '/static/js/dashboard.js',
    '/static/icons/notification-192.png',
    '/static/icons/alert-192.png',
    '/static/icons/web-192.png',
    '/dashboard',
    '/login',
    '/profile',
];


// Install event: Cache static resources
self.addEventListener('install', (event) => {
    console.log('Service Worker kuruluyor...');
    console.log('Önbelleğe alınmaya çalışılan URL’ler:', urlsToCache);

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Statik kaynaklar önbelleğe alınıyor...');
            return Promise.all(
                urlsToCache.map((url) => {
                    return cache.add(url).catch((error) => {
                        console.warn(`Hata oluşan URL: ${url}`, error);
                    });
                })
            );
        })
    );
});



// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker is activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Handle requests
self.addEventListener('fetch', (event) => {
    const { request } = event;
    console.log('Fetch event for ', request.url);

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; // Serve from cache
            }

            return fetch(request)
                .then((response) => {
                    // Cache dynamic data (e.g., API calls)
                    if (request.url.includes('/api/') || request.url.includes('/dashboard')) {
                        return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                            cache.put(request, response.clone());
                            return response;
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback to offline.html for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                });
        })
    );
});

// Sync event: Handle background sync for offline data
self.addEventListener('sync', (event) => {
    if (event.tag === 'sendOfflineData') {
        console.log('Sync event triggered: Sending offline data...');
        // Send queued offline data to the server
        offlineQueue.forEach((request) => {
            fetch(request)
                .then((response) => {
                    console.log('Data successfully sent');
                    offlineQueue = offlineQueue.filter((item) => item !== request); // Remove sent requests from queue
                })
                .catch((error) => {
                    console.error('Failed to send data:', error);
                });
        });
    }
});

// Push event: Handle push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'You have a new message!',
        icon: '/static/icons/notification-192.png',
        badge: '/static/icons/alert-72.png'
    };
    event.waitUntil(
        self.registration.showNotification('New Notification', options)
    );
});

// Notification click event: Redirect to a specific page
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/dashboard') // Redirect to dashboard on click
    );
});
