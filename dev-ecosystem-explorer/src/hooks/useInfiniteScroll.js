/**
 * useInfiniteScroll — loads more results as the user scrolls down.
 * Uses page-based slicing of the full results array.
 */

import { useState, useMemo } from 'react'
import { PAGE_SIZE } from '../utils/constants'

export function useInfiniteScroll(items) {
  const [page, setPage] = useState(1)

  const visibleItems = useMemo(
    () => items.slice(0, page * PAGE_SIZE),
    [items, page]
  )

  const hasMore = visibleItems.length < items.length

  function loadMore() {
    if (hasMore) setPage((p) => p + 1)
  }

  function reset() {
    setPage(1)
  }

  return { visibleItems, hasMore, loadMore, reset }
}
