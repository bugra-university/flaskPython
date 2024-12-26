if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);

            // Request notification permission
            return Notification.requestPermission();
        })
        .then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.error('Notification permission denied.');
            }
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}
