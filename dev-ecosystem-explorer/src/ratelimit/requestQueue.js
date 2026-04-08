/**
 * Concurrency limiter — a request queue.
 *
 * maxConcurrent = 3 means at most 3 requests fly at once
 * (one per source). Any extra requests wait in line.
 */

import { MAX_CONCURRENT } from '../utils/constants'

function createRequestQueue(maxConcurrent = MAX_CONCURRENT) {
  const pending = []
  let running   = 0

  function tryFlush() {
    while (running < maxConcurrent && pending.length > 0) {
      const { fn, resolve, reject } = pending.shift()
      running++
      fn()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          running--
          tryFlush()
        })
    }
  }

  function enqueue(fn) {
    return new Promise((resolve, reject) => {
      pending.push({ fn, resolve, reject })
      tryFlush()
    })
  }

  return { enqueue }
}

export const requestQueue = createRequestQueue(MAX_CONCURRENT)
