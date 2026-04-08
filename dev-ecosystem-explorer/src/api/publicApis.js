import { PUBLIC_API, RESULTS_PER_SOURCE } from '../utils/constants'
import { normalizePublicApi } from '../utils/normalize'
import { withRateLimit } from '../ratelimit'

async function _fetchPublicApis(query) {
  const url = `${PUBLIC_API}?title=${encodeURIComponent(query)}`

  const res = await fetch(url)

  if (!res.ok) throw new Error(`Public APIs error: ${res.status}`)

  const data = await res.json()
  const entries = data.entries ?? []

  return entries
    .slice(0, RESULTS_PER_SOURCE)
    .map(normalizePublicApi)
}

export const fetchPublicApis = withRateLimit(_fetchPublicApis)
