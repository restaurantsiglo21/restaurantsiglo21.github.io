  
var cacheName = "liftup-v1";
var filesToCache = [
    "/",
    "/index.html",
    "/login.html",
    "/bodega.html",
    "/confirmacion.html",
    "/finanzas.html",
    "/login_mesa.html",
    "/menu.html",
    "/mesas.html",
    "/notificacion.html",
    "/orden.html", 
    "/pago.html", 
    "/style/css/background/banner.jpg",
    "/style/css/banner.css",
    "/style/css/bodega.css",
    "/style/css/finanzas.css",
    "/style/css/grid.css",
    "/style/css/login.css",
    "/style/css/main.css",
    "/style/css/menu.css",
    "/style/css/menu_mesa.css",
    "/style/css/mesas.css",
    "/style/css/order.css",
    "/style/css/register.css",
    "/style/css/service.css",
    "/style/css/tabla.css",
    "/style/images/banner.jpg",
    "/style/images/facebook.png",
    "/style/images/favicon.png",
    "/style/images/imagen1.jpg",
    "/style/images/imagen2.jpg",
    "/style/images/imagen3.jpg",
    "/style/images/imagen4.jpg",
    "/style/images/imagen5.jpg",
    "/style/images/imagen6.jpg",
    "/style/images/imagen7.jpg",
    "/style/images/twitter.png",
    "/style/images/whatsup.png",
    "/style/js/app.js",
    "/style/js/cargarmesa.js",
    "/style/js/crearmovimiento.js",
    "/style/js/crearpago.js",
    "/style/js/crearpedido.js",
    "/style/js/crearproducto.js",
    "/style/js/crearreceta.js",
    "/style/js/editarmesa.js",
    "/style/js/editarorden.js",
    "/style/js/list.js",
    "/style/js/listacliente.js",
    "/style/js/listamovimiento.js",
    "/style/js/listanotificacion.js",
    "/style/js/listaorden.js",
    "/style/js/listaproducto.js",
    "/style/js/listarecetas.js",
    "/style/js/login2.js",
    "/style/js/logout2.js",
    "/style/js/panel.js",
    "/style/js/push.js.map",
    "/style/js/push.min.js",
    "/style/js/push.min.js.map",
    "/style/js/reporte.js",
    "/style/js/validar.js",
    "/style/js/validar_client.js",
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );