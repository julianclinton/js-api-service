'use strict'

const path = require('path')
const config = require('./config')
const { logger } = require('./util/service-logger')
const app = require('./app')

// Handle various ways of exiting
process.on('exit', (exitCode) => {
  logger.info(`service stopped: exitCode=${exitCode}`)
})

function shutdownRequestHandler (reason) {
  logger.info(`service stopping: reason=${reason}`)
  process.exit(0)
}

process.on('SIGINT', shutdownRequestHandler)
process.on('SIGTERM', shutdownRequestHandler)
process.on('SIGUSR1', shutdownRequestHandler)
process.on('SIGUSR2', shutdownRequestHandler)

process.on('uncaughtException', (err) => {
  logger.error('uncaught exception', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('unhandled rejection', reason)
  process.exit(1)
})

const port = config.PORT

if (config.USE_SSL) {
  const https = require('https')
  const fs = require('fs')

  const options = {
    key: fs.readFileSync(path.join(config.TLSDIR, 'key.pem')),
    cert: fs.readFileSync(path.join(config.TLSDIR, 'cert.pem'))
  }

  https.createServer(options, app)
    .listen(port, () => {
      logger.info(`service started on https port ${port}`)
    })
} else {
  app.listen(port, () => {
    logger.info(`service started on http port ${port}`)
  })
}
