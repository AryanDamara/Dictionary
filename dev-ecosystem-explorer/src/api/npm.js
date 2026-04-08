import { NPM_API, RESULTS_PER_SOURCE } from '../utils/constants'
import { normalizeNpm } from '../utils/normalize'
import { withRateLimit } from '../ratelimit'

async function _fetchNpm(query) {
  const url = `${NPM_API}` +
    `?text=${encodeURIComponent(query)}` +
    `&size=${RESULTS_PER_SOURCE}`

  const res = await fetch(url)

  if (!res.ok) throw new Error(`NPM API error: ${res.status}`)

  const data = await res.json()
  return (data.objects ?? []).map(normalizeNpm)
}

export const fetchNpm = withRateLimit(_fetchNpm)
