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

function sendNotification() {
    console.log('Attempting to send notification...');
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification('You have a new To-Do!', {
                body: 'Check your dashboard for details!',
                icon: '/static/icons/notification-192.png', // Güncellenmiş ikon yolu
                badge: '/static/icons/alert-192.png' // Bildirim badge için doğru ikon yolu
            });
            console.log('Notification sent!');
        }).catch(function (error) {
            console.error('Error in sending notification:', error);
        });
    } else {
        console.log('Notification permission not granted.');
    }
}
