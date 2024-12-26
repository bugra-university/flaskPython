if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/service-worker.js')
        .then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        });

    Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
            console.log('Notification permission granted.');
        }
    });
}

function sendNotification() {
    console.log('Attempting to send notification...');
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification('You have a new To-Do!', {
                body: 'Check your dashboard for details!',
                icon: '/static/icons/notification.png'
            });
            console.log('Notification sent!');
        });
    } else {
        console.log('Notification permission not granted.');
    }
}