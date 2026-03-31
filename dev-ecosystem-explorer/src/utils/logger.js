// ===== Logger Utility =====

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const CURRENT_LEVEL = import.meta.env.DEV ? 'debug' : 'warn';

function shouldLog(level) {
  return LOG_LEVELS[level] >= LOG_LEVELS[CURRENT_LEVEL];
}

const logger = {
  debug: (...args) => shouldLog('debug') && console.log('[DEBUG]', ...args),
  info: (...args) => shouldLog('info') && console.info('[INFO]', ...args),
  warn: (...args) => shouldLog('warn') && console.warn('[WARN]', ...args),
  error: (...args) => shouldLog('error') && console.error('[ERROR]', ...args),
};

export default logger;
