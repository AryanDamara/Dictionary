// ===== Exponential Backoff with Jitter =====

import logger from '../utils/logger';

/**
 * Sleep for ms milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff + jitter.
 * @param {Function} fn - Async function to retry
 * @param {Object} options
 * @returns {Promise<*>}
 */
export async function withBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    retryOn = (err) => err?.message?.includes('429') || err?.message?.includes('rate limit'),
  } = options;

  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries || !retryOn(error)) {
        throw error;
      }

      const delay = Math.min(
        baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000,
        maxDelay
      );

      logger.warn(`Backoff: attempt ${attempt}/${maxRetries}, retrying in ${Math.round(delay)}ms`);
      await sleep(delay);
    }
  }
}

export default withBackoff;
