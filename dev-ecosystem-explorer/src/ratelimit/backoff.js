/**
 * Exponential backoff for rate-limit errors.
 *
 * Like calling a busy restaurant:
 *   Attempt 1 fails → wait 1s   (BASE_BACKOFF_MS × 2^0)
 *   Attempt 2 fails → wait 2s   (BASE_BACKOFF_MS × 2^1)
 *   Attempt 3 fails → wait 4s   (BASE_BACKOFF_MS × 2^2)
 *   Attempt 4 fails → wait 8s   (BASE_BACKOFF_MS × 2^3)
 *   All fail         → THROW — the restaurant is closed for the night
 *
 * Only retries RATE LIMIT errors (429, 403).
 * A 404 or 500 won't go away with time — retrying them is pointless.
 */

import { MAX_RETRY_ATTEMPTS, BASE_BACKOFF_MS } from '../utils/constants'

function isRateLimitError(err) {
  return (
    err?.type === 'RATE_LIMIT' ||
    err?.status === 429 ||
    err?.status === 403
  )
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function withBackoff(fn, ...args) {
  let lastError

  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
    try {
      return await fn(...args)
    } catch (err) {
      lastError = err
      if (!isRateLimitError(err)) throw err // don't retry non-rate-limit

      const waitMs = BASE_BACKOFF_MS * Math.pow(2, attempt)
      await wait(waitMs)
    }
  }

  throw lastError
}
