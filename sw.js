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

// Gli avvisi dell'ufficio (22 ottobre 2026): richiesta nuova, ticket nuovo,
// recensione da approvare. Li manda la funzione manda-notifiche, col testo gia'
// scritto; qui si mostrano e basta, anche ad app chiusa. Solo i telefoni
// dell'ufficio che li hanno accesi in "Avvisi su questo telefono".
self.addEventListener("push", event => {
  let dati = {};
  try { dati = event.data ? event.data.json() : {}; } catch (e) { /* testo rovinato */ }
  event.waitUntil(self.registration.showNotification(dati.title || "Isla Ticket", {
    body: dati.body || "",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: dati.tag,
    data: { url: dati.url || "./" }
  }));
});

// Toccando l'avviso si apre Isla Ticket: se e' gia' aperta si usa quella
// finestra (e si ricarica, per vedere la richiesta o il ticket nuovo).
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || "./",
    self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then(finestre => {
      const aperta = finestre[0];
      if (!aperta) return self.clients.openWindow(url);
      return aperta.focus()
        .then(f => (f || aperta).navigate(url))
        .catch(() => self.clients.openWindow(url));
    })
  );
});
