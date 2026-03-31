// ===== useSearch Hook =====

import { useCallback, useEffect } from 'react';
import useSearchStore from '../store/searchStore';
import useFilterStore from '../store/filterStore';
import { useDebounce } from './useDebounce';
import { aggregateSearch, mergeResults, getSourceCounts } from '../api';
import { DEBOUNCE_MS, SOURCES } from '../utils/constants';
import logger from '../utils/logger';

export function useSearch() {
  const {
    query, setQuery, setResults, setLoading, setErrors,
    setPage, setHasMore, addToHistory, reset,
    isLoading, mergedItems, sourceCounts, errors,
    activeSource, setActiveSource, page, hasMore,
    results, appendResults, searchHistory,
  } = useSearchStore();

  const { language, category, sortBy } = useFilterStore();
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  const performSearch = useCallback(async (searchQuery, searchPage = 1, append = false) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      if (!append) reset();
      return;
    }

    setLoading(true);

    try {
      const { results: apiResults, errors: apiErrors } = await aggregateSearch(
        searchQuery,
        { page: searchPage, sort: sortBy, language, category }
      );

      const merged = mergeResults(apiResults);
      const counts = getSourceCounts(apiResults);

      if (append) {
        appendResults(merged);
      } else {
        setResults(apiResults, merged, counts);
        addToHistory(searchQuery);
      }

      setErrors(apiErrors);
      setHasMore(merged.length > 0);
    } catch (err) {
      logger.error('Search failed:', err);
      setErrors({ general: err });
      setLoading(false);
    }
  }, [sortBy, language, category]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery, 1, false);
    }
  }, [debouncedQuery, sortBy, language, category]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(query, nextPage, true);
  }, [isLoading, hasMore, page, query]);

  // Filter items by active source
  const filteredItems = activeSource === SOURCES.ALL
    ? mergedItems
    : mergedItems.filter((item) => item.source === activeSource);

  return {
    query, setQuery, filteredItems, sourceCounts,
    isLoading, errors, activeSource, setActiveSource,
    loadMore, hasMore, performSearch, searchHistory,
  };
}

export default useSearch;
