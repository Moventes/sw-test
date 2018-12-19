const withServiceWorkers = false;

if (withServiceWorkers) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(function (registration) {
                console.log('The service worker has been registered ', registration);
                return navigator.serviceWorker.ready;
            })
            .then(function (registration) {
                console.log('A service worker is active:', registration.active);
                logCounters();
            });
    } else {
        console.warn('serviceWorkers unsupported');
        logCounters();
    }
} else {
    logCounters();
}

function logCounters() {
    fetch('https://firestore.googleapis.com/v1beta1/projects/feedbackentes-test/databases/(default)/documents/counters')
        .then(res => res.json())
        .then(res => console.log('RES FROM FIRESTORE = ', res))
        .catch(e => console.error(e));
}