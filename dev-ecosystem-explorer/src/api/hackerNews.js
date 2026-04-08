/**
 * Hacker News — top stories feed.
 *
 * This source is different: it does NOT respond to the search query.
 * It always fetches the current top stories — think of it as a
 * "developer news feed" tab, not a search endpoint.
 *
 * Step 1: Fetch top story IDs
 * Step 2: Take the first 15
 * Step 3: Fetch each story's details in parallel
 */

import { HN_API } from '../utils/constants'
import { normalizeHN } from '../utils/normalize'

export async function fetchHackerNews() {
  const idsRes = await fetch(`${HN_API}/topstories.json`)
  if (!idsRes.ok) throw new Error(`HN API error: ${idsRes.status}`)

  const ids = await idsRes.json()
  const topIds = (ids ?? []).slice(0, 15)

  // Parallel fetch for all 15 stories — same service, no cross-source concern
  const stories = await Promise.all(
    topIds.map(async (id) => {
      try {
        const res = await fetch(`${HN_API}/item/${id}.json`)
        if (!res.ok) return null
        return await res.json()
      } catch {
        return null
      }
    })
  )

  return stories
    .filter((s) => s !== null && s.url)
    .map(normalizeHN)
}
