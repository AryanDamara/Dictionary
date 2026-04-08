/**
 * Docker Hub — public image search.
 * No auth required for public searches.
 */

import { DOCKER_API, RESULTS_PER_SOURCE } from '../utils/constants'
import { normalizeDocker } from '../utils/normalize'
import { withRateLimit } from '../ratelimit'

async function _fetchDockerHub(query) {
  const url = `${DOCKER_API}/search/repositories/` +
    `?query=${encodeURIComponent(query)}` +
    `&page_size=${RESULTS_PER_SOURCE}`

  const res = await fetch(url)

  if (!res.ok) throw new Error(`Docker Hub error: ${res.status}`)

  const data = await res.json()
  return (data.results ?? []).map(normalizeDocker)
}

export const fetchDockerHub = withRateLimit(_fetchDockerHub)
