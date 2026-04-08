/**
 * Service Worker — stale-while-revalidate strategy.
 *
 * Like a post office that delivers yesterday's letter immediately,
 * then checks for today's letter in the background and swaps it
 * when ready.
 *
 * On install: cache the app shell (index.html, JS, CSS).
 * On fetch:   if network succeeds → update cache and return response.
 *             if network fails    → return cached version.
 * Only cache GET requests. Never cache POST.
 */

const CACHE_NAME = 'dee-v1'

const APP_SHELL = [
  '/',
  '/index.html',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return

  // Don't cache API calls — only static assets
  const url = new URL(event.request.url)
  if (url.origin !== location.origin) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Network success — update cache
        const clone = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        return response
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(event.request)
      })
  )
})
