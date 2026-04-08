/**
 * Aggregate search — the single entry point for all API sources.
 *
 * Uses Promise.allSettled (NOT Promise.all) so that if one source
 * fails, the others still return their results. Think of it like
 * asking 7 friends for a recommendation — if one doesn't reply,
 * you still hear from the other six.
 *
 * Hacker News is fetched separately because it ignores the query
 * (it's a news feed, not a search endpoint).
 */

import { fetchGitHub }     from './github'
import { fetchNpm }        from './npm'
import { fetchPublicApis } from './publicApis'
import { fetchPyPI }       from './pypi'
import { fetchDockerHub }  from './dockerHub'
import { fetchHackerNews } from './hackerNews'
import { fetchCrates }     from './cratesIo'
import { fetchRubyGems }   from './rubyGems'
import { logger }          from '../utils/logger'

const SOURCES = [
  { name: 'github',    fn: fetchGitHub },
  { name: 'npm',       fn: fetchNpm },
  { name: 'publicapi', fn: fetchPublicApis },
  { name: 'pypi',      fn: fetchPyPI },
  { name: 'docker',    fn: fetchDockerHub },
  { name: 'crates',    fn: fetchCrates },
  { name: 'rubygems',  fn: fetchRubyGems },
]

export async function aggregateSearch(query) {
  if (!query?.trim()) return { results: [], errors: [], news: [] }

  // Fire all query-driven sources in parallel
  const settled = await Promise.allSettled(
    SOURCES.map((s) => s.fn(query))
  )

  const results = []
  const errors  = []

  settled.forEach((outcome, i) => {
    const sourceName = SOURCES[i].name
    if (outcome.status === 'fulfilled') {
      results.push(...outcome.value)
    } else {
      logger.error('api', 'fetch failed', {
        source: sourceName,
        err: outcome.reason?.message,
      })
      errors.push({ source: sourceName, error: outcome.reason })
    }
  })

  // Hacker News — always runs, independent of query
  let news = []
  try {
    news = await fetchHackerNews()
  } catch (err) {
    logger.error('api', 'HN fetch failed', { err: err?.message })
    errors.push({ source: 'hackernews', error: err })
  }

  return { results, errors, news }
}
