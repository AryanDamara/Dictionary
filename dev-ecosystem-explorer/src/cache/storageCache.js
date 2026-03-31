// ===== LocalStorage-backed Cache =====

import { CACHE_TTL } from '../utils/constants';
import logger from '../utils/logger';

const STORAGE_PREFIX = 'devex_cache_';

export const storageCache = {
  get(key) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      if (!raw) return null;
      const entry = JSON.parse(raw);
      if (Date.now() - entry.timestamp > (entry.ttl || CACHE_TTL)) {
        localStorage.removeItem(STORAGE_PREFIX + key);
        return null;
      }
      return entry.data;
    } catch (e) {
      logger.warn('Storage cache read error:', e);
      return null;
    }
  },

  set(key, data, ttl = CACHE_TTL) {
    try {
      const entry = { data, timestamp: Date.now(), ttl };
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
    } catch (e) {
      logger.warn('Storage cache write error:', e);
    }
  },

  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  clear() {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(STORAGE_PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
  },
};

export default storageCache;
