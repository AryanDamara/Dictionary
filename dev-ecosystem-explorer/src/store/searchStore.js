// ===== Search Store (Zustand) =====

import { create } from 'zustand';
import { SOURCES } from '../utils/constants';

const useSearchStore = create((set, get) => ({
  // State
  query: '',
  results: {},          // { github: { items, totalCount }, npm: {...}, publicApis: {...} }
  mergedItems: [],
  sourceCounts: {},
  activeSource: SOURCES.ALL,
  isLoading: false,
  errors: {},
  page: 1,
  hasMore: true,
  searchHistory: JSON.parse(localStorage.getItem('devex_search_history') || '[]'),

  // Actions
  setQuery: (query) => set({ query }),

  setResults: (results, mergedItems, sourceCounts) =>
    set({ results, mergedItems, sourceCounts, isLoading: false }),

  appendResults: (newItems) =>
    set((state) => ({
      mergedItems: [...state.mergedItems, ...newItems],
    })),

  setActiveSource: (source) => set({ activeSource: source, page: 1 }),

  setLoading: (isLoading) => set({ isLoading }),

  setErrors: (errors) => set({ errors }),

  setPage: (page) => set({ page }),

  setHasMore: (hasMore) => set({ hasMore }),

  addToHistory: (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const history = get().searchHistory.filter((q) => q !== trimmed);
    history.unshift(trimmed);
    const limited = history.slice(0, 20);
    set({ searchHistory: limited });
    localStorage.setItem('devex_search_history', JSON.stringify(limited));
  },

  clearHistory: () => {
    set({ searchHistory: [] });
    localStorage.removeItem('devex_search_history');
  },

  reset: () =>
    set({
      query: '',
      results: {},
      mergedItems: [],
      sourceCounts: {},
      isLoading: false,
      errors: {},
      page: 1,
      hasMore: true,
    }),
}));

export default useSearchStore;
