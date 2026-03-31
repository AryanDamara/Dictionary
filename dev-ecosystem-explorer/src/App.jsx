// ===== App.jsx — Root Component =====
import React, { useState, useCallback } from 'react';
import Header from './components/Layout/Header';
import AppShell from './components/Layout/AppShell';
import FilterPanel from './components/Filters/FilterPanel';
import SourceTabs from './components/Results/SourceTabs';
import ResultGrid from './components/Results/ResultGrid';
import EmptyState from './components/Results/EmptyState';
import InfiniteScroll from './components/Pagination/InfiniteScroll';
import TrendingQueries from './components/Search/TrendingQueries';
import Spinner from './components/Feedback/Spinner';
import ErrorBanner from './components/Feedback/ErrorBanner';
import ToastContainer from './components/Feedback/Toast';
import { useSearch } from './hooks/useSearch';
import { useFilters } from './hooks/useFilters';
import { useFavorites } from './hooks/useFavorites';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const {
    query, setQuery, filteredItems, sourceCounts,
    isLoading, errors, activeSource, setActiveSource,
    loadMore, hasMore, searchHistory,
  } = useSearch();

  const filters = useFilters();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const handleThemeToggle = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? '' : 'light');
      return next;
    });
  }, []);

  const handleFilter = useCallback((key, value) => {
    if (key === 'reset') {
      filters.resetFilters();
    } else if (key === 'sortBy') {
      filters.setSortBy(value);
    } else if (key === 'language') {
      filters.setLanguage(value);
    } else if (key === 'category') {
      filters.setCategory(value);
    }
  }, [filters]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, [setQuery]);

  const errorMessages = Object.entries(errors)
    .map(([source, err]) => `${source}: ${err?.message || 'Unknown error'}`)
    .join('; ');

  const hasQuery = query.trim().length >= 2;
  const showResults = hasQuery && filteredItems.length > 0;
  const showEmpty = hasQuery && !isLoading && filteredItems.length === 0;
  const showWelcome = !hasQuery && !isLoading;

  return (
    <>
      <Header
        query={query}
        onQueryChange={setQuery}
        onClear={handleClear}
        searchHistory={searchHistory}
        favoritesCount={favorites.length}
        onThemeToggle={handleThemeToggle}
        darkMode={darkMode}
      />

      <AppShell
        sidebar={
          <FilterPanel
            filters={{
              language: filters.language,
              sortBy: filters.sortBy,
              hasActiveFilters: filters.hasActiveFilters,
            }}
            onFilter={handleFilter}
          />
        }
      >
        {/* Error Banner */}
        {errorMessages && <ErrorBanner message={errorMessages} />}

        {/* Source Tabs */}
        {hasQuery && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <SourceTabs
              activeSource={activeSource}
              onSelect={setActiveSource}
              counts={sourceCounts}
            />
          </div>
        )}

        {/* Loading */}
        {isLoading && filteredItems.length === 0 && (
          <Spinner text="Searching across GitHub, npm, and 1400+ public APIs..." />
        )}

        {/* Results */}
        {showResults && (
          <>
            <div style={{
              marginBottom: 'var(--space-3)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
            }}>
              Showing {filteredItems.length} results
              {sourceCounts.all > filteredItems.length && ` of ${sourceCounts.all.toLocaleString()}`}
            </div>
            <ResultGrid
              items={filteredItems}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
            <InfiniteScroll
              onLoadMore={loadMore}
              hasMore={hasMore}
              isLoading={isLoading}
            />
          </>
        )}

        {/* Empty */}
        {showEmpty && <EmptyState type="no-results" />}

        {/* Welcome */}
        {showWelcome && (
          <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: 'var(--space-16)' }}>
            <EmptyState type="welcome" />
            <div style={{ marginTop: 'var(--space-8)' }}>
              <TrendingQueries onSelect={setQuery} />
            </div>
          </div>
        )}
      </AppShell>

      <ToastContainer />
    </>
  );
}
