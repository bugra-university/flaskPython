const CACHE_NAME = 'todo-app-cache-v1';
const DYNAMIC_CACHE_NAME = 'todo-app-dynamic-cache-v1';
const urlsToCache = [
    '/', // Home page
    '/static/css/dashboard.css',
    '/static/js/dashboard.js',
    '/static/icons/notification-192.png', // Notification icon
    '/static/icons/alert-192.png',        // Alert badge
    '/static/icons/web-192.png'           // General app icon (if needed)
];

// Install event: Cache static resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching static resources...');
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
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

// Fetch event: Serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Handle API requests separately
    if (request.url.includes('/api/')) {
        event.respondWith(
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                return fetch(request)
                    .then((response) => {
                        // Clone and store the response in the dynamic cache
                        cache.put(request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        // Return from cache if offline
                        return caches.match(request);
                    });
            })
        );
    } else {
        // Handle static resources
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request).catch(() => {
                    // Optional fallback for static content
                    return caches.match('/');
                });
            })
        );
    }
});

// Push event: Handle push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'You have a new message!',
        icon: '/static/icons/notification-192.png', // Notification icon
        badge: '/static/icons/alert-72.png'        // Badge for notifications
    };
    event.waitUntil(
        self.registration.showNotification('New Notification', options)
    );
});

// Notification click event: Redirect to a specific page
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/dashboard') // Redirect to dashboard
    );
});
