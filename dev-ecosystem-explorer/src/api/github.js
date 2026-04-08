import { GITHUB_API, RESULTS_PER_SOURCE, GITHUB_TOKEN_KEY } from '../utils/constants'
import { normalizeGitHub } from '../utils/normalize'
import { withRateLimit } from '../ratelimit'

function getHeaders() {
  // Check env var first, then localStorage (set via Settings drawer)
  const token = import.meta.env.VITE_GITHUB_TOKEN || (() => {
    try { return localStorage.getItem(GITHUB_TOKEN_KEY) } catch { return null }
  })()
  const headers = { 'Accept': 'application/vnd.github+json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function _fetchGitHub(query) {
  const url = `${GITHUB_API}/search/repositories` +
    `?q=${encodeURIComponent(query)}` +
    `&sort=stars&order=desc` +
    `&per_page=${RESULTS_PER_SOURCE}`

  const res = await fetch(url, { headers: getHeaders() })

  if (res.status === 403 || res.status === 429) {
    const resetAt = res.headers.get('X-RateLimit-Reset')
    const err = new Error('GitHub rate limit reached')
    err.type = 'RATE_LIMIT'
    err.resetAt = resetAt ? new Date(resetAt * 1000) : null
    throw err
  }
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const data = await res.json()
  return (data.items ?? []).map(normalizeGitHub)
}

export const fetchGitHub = withRateLimit(_fetchGitHub)
