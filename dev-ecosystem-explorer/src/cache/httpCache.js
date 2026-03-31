// ===== HTTP Cache Wrapper =====
// Wraps fetch() with memory + storage cache layers.

import memoryCache from './memoryCache';
import storageCache from './storageCache';
import logger from '../utils/logger';

/**
 * Fetch with two-tier caching: memory first, then localStorage.
 */
export async function httpCachedFetch(url, options = {}) {
  const cacheKey = url + (options.body ? JSON.stringify(options.body) : '');

  // L1: Memory
  const memResult = memoryCache.get(cacheKey);
  if (memResult) {
    logger.debug('Memory cache hit:', cacheKey);
    return memResult;
  }

  // L2: Storage
  const storageResult = storageCache.get(cacheKey);
  if (storageResult) {
    logger.debug('Storage cache hit:', cacheKey);
    memoryCache.set(cacheKey, storageResult);
    return storageResult;
  }

  // Network
  logger.debug('Cache miss, fetching:', url);
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  // Store in both caches
  memoryCache.set(cacheKey, data);
  storageCache.set(cacheKey, data);

  return data;
}

export default httpCachedFetch;
