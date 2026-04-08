/**
 * localStorage cache layer.
 *
 * Every localStorage call is wrapped in try/catch because:
 *   1. Private/incognito mode may block localStorage entirely
 *   2. QuotaExceededError fires when storage is full
 * Both must fail silently — the cache is optional, not critical.
 */

import { CACHE_PREFIX, RECENT_KEY } from '../utils/constants'

export function get(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const entry = JSON.parse(raw)
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(CACHE_PREFIX + key)
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

export function set(key, data, ttl) {
  try {
    const entry = { data, expiresAt: Date.now() + ttl }
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry))
  } catch {
    // Fail silently — cache is not critical
  }
}

export function has(key) {
  return get(key) !== null
}

export function del(key) {
  try {
    localStorage.removeItem(CACHE_PREFIX + key)
  } catch {
    // Fail silently
  }
}

export function clear() {
  try {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(CACHE_PREFIX)) keysToRemove.push(k)
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k))
  } catch {
    // Fail silently
  }
}

export function keys() {
  try {
    const result = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(CACHE_PREFIX)) {
        const query = k.slice(CACHE_PREFIX.length)
        if (has(query)) result.push(query)
      }
    }
    return result
  } catch {
    return []
  }
}

// ─── Recent Searches ──────────────────────────────────────────────
const MAX_RECENT = 5

export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addRecentSearch(query) {
  try {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return
    let recents = getRecentSearches()
    recents = recents.filter((q) => q !== trimmed)
    recents.unshift(trimmed)
    recents = recents.slice(0, MAX_RECENT)
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents))
  } catch {
    // Fail silently
  }
}
