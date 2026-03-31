// ===== In-Memory LRU Cache =====

import { CACHE_TTL } from '../utils/constants';
import logger from '../utils/logger';

class MemoryCache {
  constructor(maxSize = 100, ttl = CACHE_TTL) {
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.cache = new Map();
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      logger.debug('Cache expired:', key);
      return null;
    }
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.data;
  }

  set(key, data) {
    if (this.cache.size >= this.maxSize) {
      // Evict oldest (first entry)
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
      logger.debug('Cache evicted:', oldest);
    }
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear() {
    this.cache.clear();
  }

  get size() {
    return this.cache.size;
  }
}

export default new MemoryCache();
