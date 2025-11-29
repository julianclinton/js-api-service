const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'production'
const homedir = path.join(__dirname, '../')
const port = process.env.SERVER_PORT || '3001'
const useSSL = NODE_ENV === 'production'
const tlsDir = path.join(homedir, 'tls')

// Configure logging
const defaultLogLevel = NODE_ENV === 'production' ? 'info' : 'debug'

const services = {
  'asset-service': {
    HOST: process.env.ASSET_SERVICE_HOST || 'localhost',
    PORT: process.env.ASSET_SERVICE_PORT || '3100'
  }
  /*,
  'eventmanager-service': {
    HOST: process.env.EM_SERVICE_HOST || 'localhost',
    PORT: process.env.EM_SERVICE_PORT || '5672'
  }
  */
}

module.exports = {
  NODE_ENV,
  HOMEDIR: homedir,
  LOG_LEVEL: process.env.LOG_LEVEL || defaultLogLevel,
  PORT: port,
  USE_SSL: useSSL,
  TLSDIR: tlsDir,
  SERVICES: services
}
