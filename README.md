# Isla Ticket

L'app dei venditori di Isla: <https://jacques88-sudo.github.io/isla-ticket/>

Qui ci sono solo la pagina, il manifest, le icone e il service worker. Il codice
(`venditori.js`, stili, catalogo, Supabase) sta nel repository
[isla](https://github.com/jacques88-sudo/isla) e la pagina lo carica da `../isla/`.

Sta in un repository a parte perché su Android un'app installata si prende tutti
gli indirizzi che cominciano come il suo: dentro `/isla/` "Isla Ticket" veniva
aperta da Isla e non si poteva installare.

**Il modulo HTML è qui, il codice è in `isla`:** se si cambia il modulo in
`venditori.js`, va controllato anche `index.html` di questo repository.
