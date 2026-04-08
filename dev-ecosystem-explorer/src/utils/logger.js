/**
 * Structured logger that wraps console.
 *
 * In production: suppress debug and info.
 * In development: show all levels.
 */

const isProd = typeof import.meta !== 'undefined' && import.meta.env?.PROD

function timestamp() {
  return new Date().toISOString()
}

function log(level, source, message, data) {
  const prefix = `[${level.toUpperCase()}] [${timestamp()}] [${source}]`
  if (data !== undefined) {
    console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
      prefix, message, data
    )
  } else {
    console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
      prefix, message
    )
  }
}

export const logger = {
  debug(source, message, data) {
    if (!isProd) log('debug', source, message, data)
  },
  info(source, message, data) {
    if (!isProd) log('info', source, message, data)
  },
  warn(source, message, data) {
    log('warn', source, message, data)
  },
  error(source, message, data) {
    log('error', source, message, data)
  },
}
