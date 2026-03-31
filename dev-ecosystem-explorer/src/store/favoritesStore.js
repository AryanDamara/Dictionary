// ===== Favorites Store (Zustand) =====

import { create } from 'zustand';

const STORAGE_KEY = 'devex_favorites';

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

const useFavoritesStore = create((set, get) => ({
  favorites: loadFavorites(),

  isFavorite: (id) => get().favorites.some((f) => f.id === id),

  addFavorite: (item) => {
    const favorites = [...get().favorites, item];
    saveFavorites(favorites);
    set({ favorites });
  },

  removeFavorite: (id) => {
    const favorites = get().favorites.filter((f) => f.id !== id);
    saveFavorites(favorites);
    set({ favorites });
  },

  toggleFavorite: (item) => {
    if (get().isFavorite(item.id)) {
      get().removeFavorite(item.id);
    } else {
      get().addFavorite(item);
    }
  },

  clearFavorites: () => {
    saveFavorites([]);
    set({ favorites: [] });
  },
}));

export default useFavoritesStore;
