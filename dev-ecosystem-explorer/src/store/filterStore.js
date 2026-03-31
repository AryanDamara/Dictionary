// ===== Filter Store (Zustand) =====

import { create } from 'zustand';

const useFilterStore = create((set) => ({
  // State
  language: '',
  category: '',
  sortBy: 'relevance',
  auth: '',         // For Public APIs: apikey, oauth, etc.
  https: null,      // For Public APIs: true/false/null (any)

  // Actions
  setLanguage: (language) => set({ language }),
  setCategory: (category) => set({ category }),
  setSortBy: (sortBy) => set({ sortBy }),
  setAuth: (auth) => set({ auth }),
  setHttps: (https) => set({ https }),

  resetFilters: () =>
    set({
      language: '',
      category: '',
      sortBy: 'relevance',
      auth: '',
      https: null,
    }),
}));

export default useFilterStore;
