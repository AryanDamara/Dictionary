/**
 * Unified two-layer cache.
 *
 * Read order:  memory → localStorage → null (miss)
 * Write order: both layers simultaneously
 *
 * On a localStorage hit we "warm" the memory cache so the second
 * call in the same session is instant (memory reads are ~1000×
 * faster than JSON.parse from localStorage).
 */

import * as memory  from './memoryCache'
import * as storage from './storageCache'
import { CACHE_TTL } from '../utils/constants'

/**
 * Pick the shortest TTL from all sources present in a result set.
 * This prevents stale GitHub data from being served just because
 * Public APIs has a 30-minute TTL.
 */
function pickTTL(results) {
  const sources = new Set(results.map((r) => r.source))
  let shortest = Infinity
  for (const src of sources) {
    const ttl = CACHE_TTL[src]
    if (ttl && ttl < shortest) shortest = ttl
  }
  return shortest === Infinity ? CACHE_TTL.github : shortest
}

export function get(key) {
  // Layer 1: memory (fastest)
  const memHit = memory.get(key)
  if (memHit) return memHit

  // Layer 2: localStorage
  const storageHit = storage.get(key)
  if (storageHit) {
    // Warm memory cache for subsequent reads
    const ttl = storageHit.results
      ? pickTTL(storageHit.results)
      : CACHE_TTL.github
    memory.set(key, storageHit, ttl)
    return storageHit
  }

  return null
}

export function set(key, data) {
  const ttl = data.results ? pickTTL(data.results) : CACHE_TTL.github
  memory.set(key, data, ttl)
  storage.set(key, data, ttl)
}

export function has(key) {
  return memory.has(key) || storage.has(key)
}

export function del(key) {
  memory.del(key)
  storage.del(key)
}

export function clear() {
  memory.clear()
  storage.clear()
}

export function allKeys() {
  const memKeys     = memory.keys()
  const storageKeys = storage.keys()
  return [...new Set([...memKeys, ...storageKeys])]
}
