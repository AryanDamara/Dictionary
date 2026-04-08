// ─── API Base URLs ──────────────────────────────────────────────────
export const GITHUB_API    = 'https://api.github.com'
export const NPM_API       = 'https://registry.npmjs.org/-/v1/search'
export const PUBLIC_API    = 'https://api.publicapis.org/entries'
export const PYPI_API      = 'https://pypi.org/pypi'
export const DOCKER_API    = 'https://hub.docker.com/v2'
export const HN_API        = 'https://hacker-news.firebaseio.com/v0'
export const CRATES_API    = 'https://crates.io/api/v1'
export const RUBYGEMS_API  = 'https://rubygems.org/api/v1'

// ─── Results & Pagination ───────────────────────────────────────────
export const RESULTS_PER_SOURCE = 10
export const PAGE_SIZE          = 20

// ─── Cache TTLs (milliseconds) ─────────────────────────────────────
export const CACHE_TTL = {
  github:     300_000,      // 5 minutes
  npm:        300_000,      // 5 minutes
  publicapi:  1_800_000,    // 30 minutes
  pypi:       600_000,      // 10 minutes
  docker:     600_000,      // 10 minutes
  hackernews: 900_000,      // 15 minutes
  crates:     300_000,      // 5 minutes
  rubygems:   300_000,      // 5 minutes
}

// ─── Debounce ───────────────────────────────────────────────────────
export const SEARCH_DEBOUNCE_MS = 300

// ─── Rate Limit ─────────────────────────────────────────────────────
export const MAX_RETRY_ATTEMPTS = 4
export const BASE_BACKOFF_MS    = 1000
export const MAX_CONCURRENT     = 3

// ─── localStorage Keys ─────────────────────────────────────────────
export const CACHE_PREFIX       = 'dee_cache_'
export const FAVORITES_KEY      = 'dee_favorites'
export const RECENT_KEY         = 'dee_recent_searches'
export const ANALYTICS_KEY      = 'dee_analytics'
export const VIEW_PREF_KEY      = 'dee_view_pref'
export const GITHUB_TOKEN_KEY   = 'dee_github_token'
export const THEME_KEY          = 'dee_theme'

// ─── Trending fallback queries ──────────────────────────────────────
export const FALLBACK_TRENDING = [
  'react', 'docker', 'authentication', 'graphql',
  'rust', 'typescript', 'python', 'kubernetes',
]

// ─── Relative time formatter ────────────────────────────────────────
export function formatRelative(dateStr) {
  if (!dateStr) return null
  const now  = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours   = Math.floor(minutes / 60)
  const days    = Math.floor(hours / 24)
  const months  = Math.floor(days / 30)
  const years   = Math.floor(days / 365)

  if (years   > 0) return `${years} year${years > 1 ? 's' : ''} ago`
  if (months  > 0) return `${months} month${months > 1 ? 's' : ''} ago`
  if (days    > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours   > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}
