/**
 * PyPI — Python Package Index
 *
 * PyPI does NOT have a general search endpoint. It only supports
 * package-by-name lookup: GET /pypi/{name}/json
 * If the exact name is not found (404), we return [].
 */

import { PYPI_API } from '../utils/constants'
import { normalizePyPI } from '../utils/normalize'
import { withRateLimit } from '../ratelimit'

async function _fetchPyPI(query) {
  const url = `${PYPI_API}/${encodeURIComponent(query)}/json`

  const res = await fetch(url)

  if (res.status === 404) return []
  if (!res.ok) throw new Error(`PyPI API error: ${res.status}`)

  const data = await res.json()
  return [normalizePyPI(data)]
}

export const fetchPyPI = withRateLimit(_fetchPyPI)
