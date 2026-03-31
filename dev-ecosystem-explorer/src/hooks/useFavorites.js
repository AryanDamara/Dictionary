// ===== useFavorites Hook =====

import useFavoritesStore from '../store/favoritesStore';

export function useFavorites() {
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavoritesStore();
  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}

export default useFavorites;
