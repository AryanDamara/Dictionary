// ===== Concurrent Request Queue =====
// Limits the number of in-flight requests to avoid hammering APIs.

import { MAX_CONCURRENT_REQUESTS } from '../utils/constants';
import logger from '../utils/logger';

class RequestQueue {
  constructor(maxConcurrent = MAX_CONCURRENT_REQUESTS) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  /**
   * Enqueue an async task. Resolves when the task completes.
   */
  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._processNext();
    });
  }

  async _processNext() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) return;

    this.running++;
    const { task, resolve, reject } = this.queue.shift();

    try {
      const result = await task();
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      this.running--;
      this._processNext();
    }
  }

  get pending() {
    return this.queue.length;
  }

  get active() {
    return this.running;
  }
}

export default new RequestQueue();
