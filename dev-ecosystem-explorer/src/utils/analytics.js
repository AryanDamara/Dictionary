/**
 * Lightweight analytics tracker using localStorage.
 * No external service — just counts how many times each query is searched.
 */

import { ANALYTICS_KEY } from './constants'

export function trackSearch(query) {
  try {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return
    const raw = localStorage.getItem(ANALYTICS_KEY)
    const data = raw ? JSON.parse(raw) : {}
    data[trimmed] = (data[trimmed] || 0) + 1
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data))
  } catch {
    // Fail silently
  }
}

export function getTopQueries(n = 8) {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([query]) => query)
  } catch {
    return []
  }
}
