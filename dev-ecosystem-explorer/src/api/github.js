// ===== GitHub API Integration =====

import { API_ENDPOINTS, PAGE_SIZE } from '../utils/constants';
import { normalizeGitHub } from '../utils/normalize';
import rateLimitedFetch from '../ratelimit';
import logger from '../utils/logger';

/**
 * Search GitHub repositories.
 * @param {string} query
 * @param {Object} options - { page, perPage, sort, language }
 * @returns {Promise<{ items: Array, totalCount: number }>}
 */
export async function searchGitHub(query, options = {}) {
  const { page = 1, perPage = PAGE_SIZE, sort = 'best-match', language } = options;

  let q = query;
  if (language) q += ` language:${language}`;

  const params = new URLSearchParams({
    q,
    sort: sort === 'relevance' ? 'best-match' : sort === 'stars' ? 'stars' : sort === 'recent' ? 'updated' : 'best-match',
    order: 'desc',
    page: String(page),
    per_page: String(perPage),
  });

  const url = `${API_ENDPOINTS.GITHUB_SEARCH}?${params}`;

  const headers = {};
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  headers['Accept'] = 'application/vnd.github+json';

  try {
    const data = await rateLimitedFetch(url, { headers });
    logger.info(`GitHub: ${data.total_count} results for "${query}"`);
    return {
      items: (data.items || []).map(normalizeGitHub),
      totalCount: data.total_count || 0,
    };
  } catch (err) {
    logger.error('GitHub search failed:', err);
    throw err;
  }
}
