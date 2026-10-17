// Il service worker di "Isla Ticket", solo per questa cartella.
//
// Non mette niente in cache: i venditori devono vedere sempre i dati veri, e
// leggere la foto vuole comunque la rete. Serve perche' Chrome su Android
// propone di installare l'app solo se la pagina ne ha uno che risponde alle
// richieste (il "fetch" qui sotto).
//
// Da non confondere con isla/sw.js, quello di Isla: questo vale solo per
// isla-ticket/. Anche i file presi da ../isla/ passano di qui, e vanno
// sempre in rete: cosi' i venditori hanno subito la versione nuova.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request));
});
