/**
 * In-memory cache using a JavaScript Map.
 *
 * Why Map instead of a plain object?
 * A Map treats keys as opaque strings — no conflict with prototype
 * properties like "constructor" or "__proto__" that could break a
 * plain object used as a dictionary.
 *
 * Each entry stores { data, expiresAt } where expiresAt is a
 * timestamp in milliseconds. Think of it like an expiry date
 * stamped on a food container — once the date passes, the food
 * (data) is no longer safe to eat (serve).
 */

const store = new Map()

export function get(key) {
  if (!store.has(key)) return null
  const entry = store.get(key)
  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return null
  }
  return entry.data
}

export function set(key, data, ttl) {
  store.set(key, { data, expiresAt: Date.now() + ttl })
}

export function has(key) {
  if (!store.has(key)) return false
  const entry = store.get(key)
  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return false
  }
  return true
}

export function del(key) {
  store.delete(key)
}

export function clear() {
  store.clear()
}

export function size() {
  return store.size
}

export function keys() {
  return Array.from(store.keys()).filter((k) => has(k))
}
