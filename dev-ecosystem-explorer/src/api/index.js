// ===== Aggregate Search =====
// Fans out to all API sources, merges results, and deduplicates.

import { searchGitHub } from './github';
import { searchNpm } from './npm';
import { searchPublicApis } from './publicApis';
import { SOURCES } from '../utils/constants';
import logger from '../utils/logger';

/**
 * Search across all sources in parallel.
 * @param {string} query
 * @param {Object} options - { page, sources, sort, language, category }
 * @returns {Promise<{ results: Object, errors: Object }>}
 *   results: { github: { items, totalCount }, npm: {...}, publicApis: {...} }
 *   errors: { github: Error|null, ... }
 */
export async function aggregateSearch(query, options = {}) {
  const {
    page = 1,
    sources = [SOURCES.GITHUB, SOURCES.NPM, SOURCES.PUBLIC_APIS],
    sort = 'relevance',
    language,
    category,
  } = options;

  const results = {};
  const errors = {};

  const tasks = [];

  if (sources.includes(SOURCES.GITHUB)) {
    tasks.push(
      searchGitHub(query, { page, sort, language })
        .then((data) => { results[SOURCES.GITHUB] = data; })
        .catch((err) => { errors[SOURCES.GITHUB] = err; results[SOURCES.GITHUB] = { items: [], totalCount: 0 }; })
    );
  }

  if (sources.includes(SOURCES.NPM)) {
    tasks.push(
      searchNpm(query, { page, sort })
        .then((data) => { results[SOURCES.NPM] = data; })
        .catch((err) => { errors[SOURCES.NPM] = err; results[SOURCES.NPM] = { items: [], totalCount: 0 }; })
    );
  }

  if (sources.includes(SOURCES.PUBLIC_APIS)) {
    tasks.push(
      searchPublicApis(query, { category })
        .then((data) => { results[SOURCES.PUBLIC_APIS] = data; })
        .catch((err) => { errors[SOURCES.PUBLIC_APIS] = err; results[SOURCES.PUBLIC_APIS] = { items: [], totalCount: 0 }; })
    );
  }

  await Promise.all(tasks);

  const errorCount = Object.keys(errors).length;
  if (errorCount > 0) {
    logger.warn(`Aggregate search completed with ${errorCount} error(s):`, errors);
  }

  return { results, errors };
}

/**
 * Get merged items from all sources.
 */
export function mergeResults(results) {
  const all = [];
  Object.values(results).forEach(({ items }) => {
    if (items) all.push(...items);
  });
  return all;
}

/**
 * Get total counts per source.
 */
export function getSourceCounts(results) {
  const counts = {};
  let total = 0;
  Object.entries(results).forEach(([source, data]) => {
    counts[source] = data.totalCount || 0;
    total += counts[source];
  });
  counts[SOURCES.ALL] = total;
  return counts;
}
