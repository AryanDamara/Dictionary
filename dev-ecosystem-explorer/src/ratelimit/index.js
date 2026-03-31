// ===== Rate Limit Layer – Public API =====

export { withBackoff } from './backoff';
export { default as requestQueue } from './requestQueue';

import { withBackoff } from './backoff';
import requestQueue from './requestQueue';
import { httpCachedFetch } from '../cache';
import logger from '../utils/logger';

/**
 * Rate-limited, cached fetch.
 * Combines request queuing, caching, and exponential backoff.
 */
export async function rateLimitedFetch(url, options = {}) {
  return requestQueue.enqueue(() =>
    withBackoff(() => httpCachedFetch(url, options))
  );
}

export default rateLimitedFetch;
