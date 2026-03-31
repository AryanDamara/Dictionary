// ===== Fuzzy Search Utility =====
// Uses Fuse.js for client-side fuzzy matching on already-fetched results.

import Fuse from 'fuse.js';

const DEFAULT_OPTIONS = {
  keys: ['title', 'name', 'description', 'topics'],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

/**
 * Create a Fuse instance for fuzzy searching.
 * @param {Array} items - Normalized result items
 * @param {Object} options - Override Fuse options
 */
export function createFuzzySearch(items, options = {}) {
  return new Fuse(items, { ...DEFAULT_OPTIONS, ...options });
}

/**
 * Run a fuzzy search against a list of items.
 * @returns {Array} Matched items sorted by score (best first)
 */
export function fuzzyFilter(items, query, options = {}) {
  if (!query || query.trim().length < 2) return items;
  const fuse = createFuzzySearch(items, options);
  return fuse.search(query).map((r) => r.item);
}
