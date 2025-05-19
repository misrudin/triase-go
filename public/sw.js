const CACHE_NAME = "app-cache-v1";
const urlsToCache = ["/", "/offline", "/build/assets/app-CMDa1GJg.js"];

// Instalasi Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        fetch("/cache-files")
            .then((response) => response.json())
            .then((urlsToCache) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    return cache.addAll(urlsToCache);
                });
            })
            .catch((error) =>
                console.error("Gagal mengambil daftar file cache:", error)
            )
    );
});

// Fetch data dari cache saat offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
