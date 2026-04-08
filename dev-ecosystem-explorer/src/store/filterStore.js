/**
 * Filter store — global filter/sort state for results.
 */

import { create } from 'zustand'
import { VIEW_PREF_KEY } from '../utils/constants'

function loadViewPref() {
  try { return localStorage.getItem(VIEW_PREF_KEY) || 'grid' } catch { return 'grid' }
}

export const useFilterStore = create((set, get) => ({
  activeSource: 'all',
  activeFilters: {
    language: [],
    license:  [],
    category: [],
    https:    null,
    auth:     null,
    official: null,
  },
  sort: {
    field:     'name',
    direction: 'asc',
  },
  viewMode: loadViewPref(),

  setSource: (source) => set({ activeSource: source }),

  toggleFilter: (field, value) => {
    const current = get().activeFilters
    if (field === 'https' || field === 'auth' || field === 'official') {
      set({
        activeFilters: {
          ...current,
          [field]: current[field] === value ? null : value,
        },
      })
    } else {
      const arr = current[field] ?? []
      const newArr = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value]
      set({ activeFilters: { ...current, [field]: newArr } })
    }
  },

  setSort: (sortConfig) => set({ sort: { ...get().sort, ...sortConfig } }),

  setViewMode: (mode) => {
    try { localStorage.setItem(VIEW_PREF_KEY, mode) } catch {}
    set({ viewMode: mode })
  },

  clearAll: () =>
    set({
      activeSource: 'all',
      activeFilters: {
        language: [],
        license:  [],
        category: [],
        https:    null,
        auth:     null,
        official: null,
      },
      sort: { field: 'name', direction: 'asc' },
    }),

  hasActiveFilters: () => {
    const s = get()
    const f = s.activeFilters
    return (
      s.activeSource !== 'all' ||
      f.language.length > 0 ||
      f.license.length > 0 ||
      f.category.length > 0 ||
      f.https !== null ||
      f.auth !== null ||
      f.official !== null ||
      s.sort.field !== 'name' ||
      s.sort.direction !== 'asc'
    )
  },
}))
