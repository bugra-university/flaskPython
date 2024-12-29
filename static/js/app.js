// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js', { scope: '/' })
            .then((registration) => {
                console.log('Service Worker successfully registered:', registration);

                // Trigger background sync if available
                if ('SyncManager' in window) {
                    registration.sync.register('sendOfflineData')
                        .then(() => console.log('Offline data sync registered'))
                        .catch((error) => console.error('Sync registration failed:', error));
                }
            })
            .catch((error) => console.log('Service Worker registration failed:', error));
    });
}

// Check online/offline status and show a notification to the user
function checkOnlineStatus() {
    const statusBanner = document.getElementById('status-banner');
    const statusMessage = document.getElementById('status-message');

    if (navigator.onLine) {
        console.log('Online');
        statusBanner.style.backgroundColor = '#4CAF50';  // Green for online
        statusMessage.textContent = 'You are online, everything is fine!';
        statusBanner.style.display = 'block';
        setTimeout(() => { statusBanner.style.display = 'none'; }, 3000);  // Auto-hide
    } else {
        console.log('Offline');
        statusBanner.style.backgroundColor = '#f44336';  // Red for offline
        statusMessage.textContent = 'You are offline, please check your connection.';
        statusBanner.style.display = 'block';
    }
}

// Listen for online/offline events
window.addEventListener('online', checkOnlineStatus);
window.addEventListener('offline', checkOnlineStatus);

// Check the status on page load
checkOnlineStatus();
