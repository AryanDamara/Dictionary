/**
 * withRateLimit — composes queue + backoff.
 *
 * Call order: requestQueue → withBackoff → fn
 *
 * Returns a new function with the same signature as fn but
 * protected by concurrency limiting and exponential backoff.
 */

import { requestQueue } from './requestQueue'
import { withBackoff }  from './backoff'

export function withRateLimit(fn) {
  return function rateLimited(...args) {
    return requestQueue.enqueue(() => withBackoff(fn, ...args))
  }
}
