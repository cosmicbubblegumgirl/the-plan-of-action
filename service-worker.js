const CACHE = "sap-spellbook-academy-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./icon.svg",
  "./manifest.webmanifest",
  "./assets/SAP_HANA_SyBA_Practice_Build_Runbook.pdf",
  "./assets/Sprint_2_Part_2_Self_Service_Migration_SAP_HANA_Cloud.docx",
  "./assets/Sprint_2_Part_3_SAP_HANA_Installation_and_Administration_All_Lessons.docx",
  "./assets/Sprint_2_SAP_HANA_Cloud_Study_Notes.pdf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => Promise.all(
      ASSETS.map(async (asset) => {
        const response = await fetch(new Request(asset, { cache: "reload" }));
        if (response.ok) await cache.put(asset, response);
      })
    ))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(new Request(event.request, { cache: "reload" }))
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});
