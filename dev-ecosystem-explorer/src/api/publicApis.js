// ===== Public APIs Directory Integration =====

import { API_ENDPOINTS } from '../utils/constants';
import { normalizePublicApi } from '../utils/normalize';
import rateLimitedFetch from '../ratelimit';
import logger from '../utils/logger';

/**
 * Search public APIs directory.
 * @param {string} query
 * @param {Object} options - { category }
 * @returns {Promise<{ items: Array, totalCount: number }>}
 */
export async function searchPublicApis(query, options = {}) {
  const { category } = options;

  const params = new URLSearchParams();
  if (query) params.set('title', query);
  if (category) params.set('category', category);

  const url = `${API_ENDPOINTS.PUBLIC_APIS}?${params}`;

  try {
    const data = await rateLimitedFetch(url);
    const entries = data.entries || [];
    logger.info(`Public APIs: ${entries.length} results for "${query}"`);

    return {
      items: entries.map(normalizePublicApi),
      totalCount: data.count || entries.length,
    };
  } catch (err) {
    logger.error('Public APIs search failed:', err);
    throw err;
  }
}

/**
 * Get all available categories.
 */
export async function getCategories() {
  try {
    const data = await rateLimitedFetch('https://api.publicapis.org/categories');
    return data || [];
  } catch (err) {
    logger.error('Failed to fetch categories:', err);
    return [];
  }
}
