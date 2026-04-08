import AppShell from './components/Layout/AppShell'
import SearchBar from './components/Search/SearchBar'
import TrendingQueries from './components/Search/TrendingQueries'
import RateLimitBanner from './components/Feedback/RateLimitBanner'
import ErrorBanner from './components/Feedback/ErrorBanner'
import Spinner from './components/Feedback/Spinner'
import SourceTabs from './components/Results/SourceTabs'
import FilterPanel from './components/Filters/FilterPanel'
import SortControls from './components/Filters/SortControls'
import ClearAllButton from './components/Filters/ClearAllButton'
import ViewToggle from './components/Results/ViewToggle'
import ResultGrid from './components/Results/ResultGrid'
import ResultList from './components/Results/ResultList'
import SkeletonCard from './components/Results/SkeletonCard'
import EmptyState from './components/Results/EmptyState'
import InfiniteScrollTrigger from './components/Pagination/InfiniteScrollTrigger'
import CompareDrawer from './components/Compare/CompareDrawer'

import { useSearchStore } from './store/searchStore'
import { useFilterStore } from './store/filterStore'
import { useFavoritesStore } from './store/favoritesStore'
import { useSearch } from './hooks/useSearch'
import { useFilters } from './hooks/useFilters'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'

export default function App() {
  const query = useSearchStore((s) => s.query)
  const { activeSource, viewMode } = useFilterStore()
  const favorites = useFavoritesStore((s) => s.favorites)

  const { results, errors, news, loading } = useSearch(query)
  const filtered = useFilters(results)

  // Decide which results to display based on active tab
  let displayResults = filtered
  if (activeSource === 'hackernews') displayResults = news
  if (activeSource === 'favorites') displayResults = favorites

  const { visibleItems, hasMore, loadMore } = useInfiniteScroll(displayResults)

  const hasQuery    = query.trim().length > 0
  const hasResults  = visibleItems.length > 0
  const showEmpty   = hasQuery && !loading && displayResults.length === 0
  const showResults = hasResults && !loading

  return (
    <AppShell>
      <SearchBar />

      {!hasQuery && !loading && <TrendingQueries />}

      <RateLimitBanner errors={errors} />
      <ErrorBanner errors={errors} />

      {loading && (
        <div>
          <Spinner />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
            marginTop: 'var(--space-lg)',
          }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      )}

      {(hasResults || hasQuery) && !loading && (
        <>
          <SourceTabs
            results={results}
            news={news}
            favoritesCount={favorites.length}
          />

          {activeSource !== 'hackernews' && activeSource !== 'favorites' && (
            <FilterPanel results={results} />
          )}

          <div className="results-toolbar">
            <div className="toolbar-left">
              <span className="results-count">
                {displayResults.length} result{displayResults.length !== 1 ? 's' : ''}
              </span>
              <ClearAllButton />
            </div>
            <div className="toolbar-right">
              <SortControls />
              <ViewToggle />
            </div>
          </div>

          {showResults && (
            viewMode === 'grid'
              ? <ResultGrid results={visibleItems} />
              : <ResultList results={visibleItems} />
          )}

          {showEmpty && <EmptyState query={query} />}

          <InfiniteScrollTrigger
            hasMore={hasMore}
            onLoadMore={loadMore}
            loading={loading}
          />
        </>
      )}

      {!hasQuery && !loading && !hasResults && <EmptyState query="" />}

      <CompareDrawer />

      <style>{`
        .results-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
          flex-wrap: wrap;
          gap: var(--space-md);
        }
        .toolbar-left {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        .results-count {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          font-weight: 500;
        }
      `}</style>
    </AppShell>
  )
}
