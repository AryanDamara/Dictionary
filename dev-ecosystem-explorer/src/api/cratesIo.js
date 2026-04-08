/**
 * Crates.io — Rust package registry.
 *
 * IMPORTANT: Crates.io requires a User-Agent header. Requests
 * without one are blocked as bot protection.
 */

import { CRATES_API, RESULTS_PER_SOURCE } from '../utils/constants'
import { normalizeCrate } from '../utils/normalize'
import { withRateLimit } from '../ratelimit'

async function _fetchCrates(query) {
  const url = `${CRATES_API}/crates` +
    `?q=${encodeURIComponent(query)}` +
    `&per_page=${RESULTS_PER_SOURCE}`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'DevEcosystemExplorer/1.0 (contact@example.com)',
    },
  })

  if (!res.ok) throw new Error(`Crates.io error: ${res.status}`)

  const data = await res.json()
  return (data.crates ?? []).map(normalizeCrate)
}

export const fetchCrates = withRateLimit(_fetchCrates)
