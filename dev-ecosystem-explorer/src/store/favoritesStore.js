/**
 * Favorites store — saved items synced to localStorage.
 *
 * Hydration happens inside the Zustand create function — not in
 * a useEffect. This means favorites are available immediately on
 * first render, not after a delayed effect.
 */

import { create } from 'zustand'
import { FAVORITES_KEY } from '../utils/constants'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch {}
}

export const useFavoritesStore = create((set, get) => ({
  favorites: loadFavorites(),

  addFavorite: (result) => {
    const current = get().favorites
    if (current.some((f) => f.id === result.id)) return
    const updated = [...current, result]
    saveFavorites(updated)
    set({ favorites: updated })
  },

  removeFavorite: (id) => {
    const updated = get().favorites.filter((f) => f.id !== id)
    saveFavorites(updated)
    set({ favorites: updated })
  },

  isFavorite: (id) => get().favorites.some((f) => f.id === id),

  toggleFavorite: (result) => {
    if (get().isFavorite(result.id)) {
      get().removeFavorite(result.id)
    } else {
      get().addFavorite(result)
    }
  },

  exportFavorites: () => {
    const json = JSON.stringify(get().favorites, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dev-ecosystem-favorites.json'
    a.click()
    URL.revokeObjectURL(url)
  },
}))
