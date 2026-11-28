// versione 2026-11-28 08:12: prima la rete (pagina sempre aggiornata), senza rete l'ultima copia salvata
const C = 'uisp';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(C).then((c) => c.addAll(['./', 'manifest.webmanifest', 'icona-192.png', 'icona-512.png']))); });
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request, {cache: 'no-store'}).then((r) => { if (r.ok) { const k = r.clone(); caches.open(C).then((c) => c.put(e.request.mode === 'navigate' ? './' : e.request, k)); } return r; })
    .catch(() => caches.match(e.request.mode === 'navigate' ? './' : e.request, {ignoreSearch: true})));
});
