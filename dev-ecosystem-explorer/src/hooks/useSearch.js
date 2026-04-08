/**
 * useSearch — the centrepiece hook.
 *
 * Pipeline:
 *   1. Debounce the raw query (300ms)
 *   2. Check cache on debounced value change
 *   3. If cache miss → call aggregateSearch
 *   4. Cancellation token prevents stale results from fast typing
 */

import { useState, useEffect, useRef } from 'react'
import { useDebounce } from './useDebounce'
import { aggregateSearch } from '../api'
import * as cache from '../cache'
import { addRecentSearch } from '../cache/storageCache'
import { trackSearch } from '../utils/analytics'
import { logger } from '../utils/logger'
import { SEARCH_DEBOUNCE_MS } from '../utils/constants'

export function useSearch(query) {
  const [results, setResults] = useState([])
  const [errors, setErrors]   = useState([])
  const [news, setNews]       = useState([])
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS)
  const abortRef = useRef({ cancelled: false })

  useEffect(() => {
    // Cancel any previous in-flight search
    abortRef.current.cancelled = true
    const token = { cancelled: false }
    abortRef.current = token

    const trimmed = debouncedQuery?.trim()

    if (!trimmed) {
      setResults([])
      setErrors([])
      setLoading(false)
      return
    }

    // Check cache first
    const cached = cache.get(trimmed)
    if (cached) {
      logger.info('cache', 'hit', { query: trimmed })
      setResults(cached.results ?? [])
      setErrors(cached.errors ?? [])
      setNews(cached.news ?? [])
      setLoading(false)
      return
    }

    // Cache miss — fetch from APIs
    setLoading(true)

    aggregateSearch(trimmed)
      .then((data) => {
        if (token.cancelled) return // stale result — discard
        cache.set(trimmed, data)
        addRecentSearch(trimmed)
        trackSearch(trimmed)
        setResults(data.results)
        setErrors(data.errors)
        setNews(data.news ?? [])
        setLoading(false)
      })
      .catch((err) => {
        if (token.cancelled) return
        logger.error('search', 'aggregateSearch failed', { err: err?.message })
        setErrors([{ source: 'unknown', error: err }])
        setLoading(false)
      })
  }, [debouncedQuery])

  return { results, errors, news, loading }
}
