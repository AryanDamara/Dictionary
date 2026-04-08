/**
 * Register the service worker.
 *
 * A Service Worker is like a personal assistant who caches your
 * regular coffee order. Even when the café is closed (offline),
 * they can still serve you from their stash.
 */

export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[SW] Registered:', reg.scope)
        })
        .catch((err) => {
          console.log('[SW] Registration failed:', err)
        })
    })
  }
}
