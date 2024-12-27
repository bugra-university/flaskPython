if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/service-worker.js')
        .then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function (error) {
            console.error('Service Worker registration failed:', error);
        });

    Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    });
}

function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, {
                body: body,
                icon: '/static/icons/notification-192.png', // Bildirim ikonu
                badge: '/static/icons/alert-192.png'       // Küçük ikon (badge)
            });
        }).catch(function (error) {
            console.error('Error in sending notification:', error);
        });
    } else {
        console.log('Notification permission not granted.');
    }
}
