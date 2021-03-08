//nombre del service worker
const VERSION = "v1";

//cuando
self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  // solo sirve para peticiones GET
  if (request.method !== "GET") {
    return;
  }

  // buscar en cache
  event.respondWith(cachedResponse(request));

  // actualizar cache
  event.waitUntil(updateCache(request));
});

//guarda los archivos de las rutas que definamos en la caché
async function precache() {
  const cache = await caches.open(VERSION);
  return cache.addAll([
    "/",
    "/index.html",
    "/assets/index.js",
    "/assets/MediaPlayer.js",
    "/assets/plugins/AutoPlay.js",
    "/assets/plugins/AutoPause.js",
    "/assets/index.css",
    "/assets/BigBuckBunny.mp4",
  ]);
}

// busca en la caché si tiene la respuesta de la petición cacheada. Si no, responde con la petición.
async function cachedResponse(request) {
  const cache = await caches.open(VERSION);
  const response = await cache.match(request);
  return response || fetch(request);
}

//actualiza la caché
async function updateCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);
}
