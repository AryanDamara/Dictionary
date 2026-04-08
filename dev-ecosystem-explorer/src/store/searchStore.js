/**
 * Search store — pure state, no logic.
 *
 * After Unit 2, the search() action was removed. The store
 * just holds the query string. The useSearch hook owns the
 * fetching, caching, and debounce logic.
 */

import { create } from 'zustand'

export const useSearchStore = create((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}))
