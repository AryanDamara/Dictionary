/**
 * RubyGems — Ruby package registry.
 */

import { RUBYGEMS_API } from '../utils/constants'
import { normalizeRubyGem } from '../utils/normalize'
import { withRateLimit } from '../ratelimit'

async function _fetchRubyGems(query) {
  const url = `${RUBYGEMS_API}/search.json?query=${encodeURIComponent(query)}`

  const res = await fetch(url)

  if (!res.ok) throw new Error(`RubyGems error: ${res.status}`)

  const data = await res.json()
  return (data ?? []).slice(0, 10).map(normalizeRubyGem)
}

export const fetchRubyGems = withRateLimit(_fetchRubyGems)
