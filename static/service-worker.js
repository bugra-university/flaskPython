const CACHE_NAME = 'todo-app-cache-v1';
const urlsToCache = [
    '/', // Home page
    '/static/css/dashboard.css',
    '/static/js/dashboard.js',
    '/static/icons/notification-192.png', // Notification icon
    '/static/icons/alert-192.png',        // Alert badge
    '/static/icons/web-192.png'          // General app icon (if needed)
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching resources...');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                // Optional fallback
                return caches.match('/');
            });
        })
    );
});

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

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/dashboard') // Redirect to dashboard
    );
});
