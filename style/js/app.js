//Instala Service Worker desde archivo service-worker.js
( function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function(cache) { 
                     console.log('Service Worker Registered');                    
                });
      }
} )( );