// Il riquadro "Installa Isla Ticket" (17 ottobre 2026).
//
// Chrome su Android: i passi dal menu, e il bottone "Installa" quando Chrome
// dice che si puo'. iPhone: i passi di Condividi. Aperta come app, niente.

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
  });
}

(function () {
  const box = document.querySelector("[data-installa]");
  if (!box) return;
  const testo = box.querySelector("[data-installa-testo]");
  const bottone = box.querySelector("[data-installa-btn]");

  const standalone = matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  const iphone = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /Android/.test(navigator.userAgent);

  function mostra(frase, etichetta, azione) {
    testo.textContent = frase;
    bottone.hidden = !etichetta;
    if (etichetta) {
      bottone.textContent = etichetta;
      bottone.onclick = azione;
    }
    box.hidden = false;
  }

  if (standalone) return;                      // e' gia' l'app installata

  if (iphone) {
    mostra("Per averla sul telefono: in Safari tocca Condividi (il quadrato con la freccia), poi «Aggiungi alla schermata Home».");
    return;
  }

  // Chrome su Android: il menu c'e' sempre, i passi si scrivono subito.
  if (android) {
    mostra("Per averla sul telefono: tocca ⋮ in alto a destra, poi «Installa app» (o «Aggiungi a schermata Home» → «Installa»).");
  }

  // Il bottone compare solo quando Chrome dice che si puo' installare.
  let richiesta = null;
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    richiesta = e;
    mostra("Mettila sul telefono come app, con la sua icona.", "Installa", async () => {
      if (!richiesta) return;
      richiesta.prompt();
      await richiesta.userChoice;
      richiesta = null;
      box.hidden = true;
    });
  });
  window.addEventListener("appinstalled", () => { box.hidden = true; });
})();
