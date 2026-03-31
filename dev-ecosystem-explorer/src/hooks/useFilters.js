// ===== useFilters Hook =====

import useFilterStore from '../store/filterStore';

export function useFilters() {
  const {
    language, setLanguage,
    category, setCategory,
    sortBy, setSortBy,
    auth, setAuth,
    https, setHttps,
    resetFilters,
  } = useFilterStore();

  const hasActiveFilters = Boolean(language || category || auth || https !== null);

  return {
    language, setLanguage,
    category, setCategory,
    sortBy, setSortBy,
    auth, setAuth,
    https, setHttps,
    resetFilters,
    hasActiveFilters,
  };
}

export default useFilters;
