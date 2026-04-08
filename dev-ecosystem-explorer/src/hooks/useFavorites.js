/**
 * useFavorites — convenience hook wrapping favoritesStore.
 * Components import this hook, never the store directly.
 */

import { useFavoritesStore } from '../store/favoritesStore'

export function useFavorites() {
  const favorites       = useFavoritesStore((s) => s.favorites)
  const toggle          = useFavoritesStore((s) => s.toggleFavorite)
  const isFavorite      = useFavoritesStore((s) => s.isFavorite)
  const exportFavorites = useFavoritesStore((s) => s.exportFavorites)

  return { favorites, toggle, isFavorite, exportFavorites }
}
