// ===== npm Registry API Integration =====

import { API_ENDPOINTS, PAGE_SIZE } from '../utils/constants';
import { normalizeNpm } from '../utils/normalize';
import rateLimitedFetch from '../ratelimit';
import logger from '../utils/logger';

/**
 * Search npm packages.
 * @param {string} query
 * @param {Object} options - { page, perPage, sort }
 * @returns {Promise<{ items: Array, totalCount: number }>}
 */
export async function searchNpm(query, options = {}) {
  const { page = 1, perPage = PAGE_SIZE, sort = 'optimal' } = options;

  const from = (page - 1) * perPage;
  const sortMap = {
    relevance: 'optimal',
    stars: 'popularity',
    recent: 'maintenance',
    name: 'optimal',
  };

  const params = new URLSearchParams({
    text: query,
    size: String(perPage),
    from: String(from),
    quality: '0.65',
    popularity: '0.98',
    maintenance: '0.5',
  });

  const url = `${API_ENDPOINTS.NPM_SEARCH}?${params}`;

  try {
    const data = await rateLimitedFetch(url);
    logger.info(`npm: ${data.total} results for "${query}"`);
    return {
      items: (data.objects || []).map(normalizeNpm),
      totalCount: data.total || 0,
    };
  } catch (err) {
    logger.error('npm search failed:', err);
    throw err;
  }
}
