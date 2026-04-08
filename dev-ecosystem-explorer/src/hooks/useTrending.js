/**
 * useTrending — derives popular queries from analytics data.
 *
 * First time: returns hardcoded fallback.
 * After several searches: returns actual user patterns.
 */

import { useState, useEffect } from 'react'
import { getTopQueries } from '../utils/analytics'
import { FALLBACK_TRENDING } from '../utils/constants'

export function useTrending() {
  const [trending, setTrending] = useState(FALLBACK_TRENDING)

  useEffect(() => {
    const derived = getTopQueries(8)
    setTrending(derived.length >= 4 ? derived : FALLBACK_TRENDING)
  }, [])

  return trending
}
