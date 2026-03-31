// ===== Constants =====

export const SOURCES = {
  ALL: 'all',
  GITHUB: 'github',
  NPM: 'npm',
  PUBLIC_APIS: 'publicApis',
};

export const SOURCE_LABELS = {
  [SOURCES.ALL]: 'All Sources',
  [SOURCES.GITHUB]: 'GitHub',
  [SOURCES.NPM]: 'npm',
  [SOURCES.PUBLIC_APIS]: 'Public APIs',
};

export const SOURCE_COLORS = {
  [SOURCES.GITHUB]: '#e6edf3',
  [SOURCES.NPM]: '#cb3837',
  [SOURCES.PUBLIC_APIS]: '#14b8a6',
};

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'stars', label: 'Stars / Score' },
  { value: 'recent', label: 'Recently Updated' },
  { value: 'name', label: 'Name (A–Z)' },
];

export const API_ENDPOINTS = {
  GITHUB_SEARCH: 'https://api.github.com/search/repositories',
  NPM_SEARCH: 'https://registry.npmjs.org/-/v1/search',
  PUBLIC_APIS: 'https://api.publicapis.org/entries',
};

export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
export const DEBOUNCE_MS = 350;
export const PAGE_SIZE = 20;
export const MAX_CONCURRENT_REQUESTS = 3;
