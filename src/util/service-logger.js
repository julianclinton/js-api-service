'use strict'

const path = require('path')
const config = require('../config')
const log4js = require('log4js')
log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'basic'
      }
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: config.LOG_LEVEL
    }
  }
})

/**
 * This wraps the default logger.
 */
class ServiceLogger {
  /**
   * @param {string} options.dataDir the base directory
   * @constructor
   */
  constructor ({ dataDir }) {
    this.dataDir = dataDir
    const appName = require(path.join(dataDir, 'package.json')).name
    this.logger = log4js.getLogger(`${appName}`)
    this.logger.level = config.LOG_LEVEL
  }

  trace (...message) {
    this.logger.trace(...message)
  }

  debug (...message) {
    this.logger.debug(...message)
  }

  info (...message) {
    this.logger.info(...message)
  }

  warn (...message) {
    this.logger.warn(...message)
  }

  error (...message) {
    this.logger.error(...message)
  }

  fatal (...message) {
    this.logger.fatal(...message)
  }

  isTraceEnabled () {
    return this.logger.isTraceEnabled()
  }

  isDebugEnabled () {
    return this.logger.isDebugEnabled()
  }

  isInfoEnabled () {
    return this.logger.isInfoEnabled()
  }

  isWarnEnabled () {
    return this.logger.isWarnEnabled()
  }

  isErrorEnabled () {
    return this.logger.isErrorEnabled()
  }

  isFatalEnabled () {
    return this.logger.isFatalEnabled()
  }
}

const logger = new ServiceLogger({
  dataDir: path.join(__dirname, '../..')
})

module.exports = {
  ServiceLogger,
  logger
}
