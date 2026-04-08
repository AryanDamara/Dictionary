/**
 * useFilters — filters + sorts results based on filterStore state.
 *
 * Filtering is done on the client side because results are already
 * fetched — no need for another API call just to filter.
 */

import { useMemo } from 'react'
import { useFilterStore } from '../store/filterStore'

export function useFilters(results) {
  const { activeSource, activeFilters, sort } = useFilterStore()

  return useMemo(() => {
    let filtered = [...results]

    // Source filter
    if (activeSource !== 'all') {
      filtered = filtered.filter((r) => r.source === activeSource)
    }

    // Language filter (multi-select)
    if (activeFilters.language.length > 0) {
      filtered = filtered.filter(
        (r) => r.language && activeFilters.language.includes(r.language)
      )
    }

    // License filter (multi-select)
    if (activeFilters.license.length > 0) {
      filtered = filtered.filter(
        (r) => r.license && activeFilters.license.includes(r.license)
      )
    }

    // Category filter (multi-select)
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(
        (r) => r.category && activeFilters.category.includes(r.category)
      )
    }

    // HTTPS filter (boolean toggle)
    if (activeFilters.https === true) {
      filtered = filtered.filter((r) => r.https === true)
    }

    // Auth filter
    if (activeFilters.auth !== null) {
      if (activeFilters.auth === '') {
        filtered = filtered.filter((r) => !r.auth)
      } else {
        filtered = filtered.filter((r) => r.auth === activeFilters.auth)
      }
    }

    // Official filter (docker)
    if (activeFilters.official === true) {
      filtered = filtered.filter((r) => r.isOfficial === true)
    }

    // Sort
    filtered.sort((a, b) => {
      let valA, valB

      switch (sort.field) {
        case 'stars':
          valA = a.stars ?? 0
          valB = b.stars ?? 0
          break
        case 'downloads':
          valA = a.downloads ?? 0
          valB = b.downloads ?? 0
          break
        case 'updatedAt':
          valA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
          valB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
          break
        case 'name':
        default:
          valA = (a.name ?? '').toLowerCase()
          valB = (b.name ?? '').toLowerCase()
          return sort.direction === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA)
      }

      return sort.direction === 'asc' ? valA - valB : valB - valA
    })

    return filtered
  }, [results, activeSource, activeFilters, sort])
}
