const express = require('express')
const path = require('path')
const cors = require('cors')
const { expressjwt } = require('express-jwt')
// const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('./config')
const ErrorHandler = require('./util/error-handler')
const { logger } = require('./util/service-logger')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { readFileSync } = require('fs')
const authConfig = JSON.parse(readFileSync('./auth_config.json'))

const app = express()
const HOMEDIR = path.join(__dirname, '../')

const appName = require(path.join(HOMEDIR, 'package.json')).name

app.use((req, res, next) => {
  // logger.debug(`>>> ${req.method} ${req.url}`)
  // logger.debug(JSON.stringify(req.headers))
  next()
})

// Set up CORS
app.use(cors())

// Set up logging
app.use(morgan(`[:date[iso]] [INFO] ${appName} - :remote-addr :remote-user ":method :url" status=:status time=:response-time ms`))

// Set up routes
const infoRouter = require('./routes/info')
const healthRouter = require('./routes/health')
const metricsRouter = require('./routes/metrics')
const swaggerRouter = require('./routes/swagger')

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token
    }
    return null
  }
})

// Just a dummy check, need to define proper admin privileges
// const checkScopes = jwtAuthz(['read:messages'])

const apiRouter = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/info', infoRouter)
apiRouter.use('/health', healthRouter)
apiRouter.use('/metrics', metricsRouter)
apiRouter.use('/api-docs', swaggerRouter)

const v1Router = express.Router()
apiRouter.use('/v1', v1Router)

const makeRoute = (service, useSSL) => {
  const settings = config.SERVICES[service]
  if (!settings) {
    throw new Error(`Unknown service for proxy: '${service}'`)
  }
  const protocol = useSSL ? 'https' : 'http'
  return `${protocol}://${settings.HOST}:${settings.PORT}`
}

const useSSL = config.USE_SSL

v1Router.use('/assets', checkJwt,
  createProxyMiddleware({
    secure: false, // allow self-signed certs
    target: makeRoute('asset-service', useSSL),
    pathRewrite: { '/api/v1/assets': '/api/v1' },
    logProvider: () => { return logger },
    changeOrigin: true
  }))

v1Router.use('/users', checkJwt,
  createProxyMiddleware({
    secure: false, // allow self-signed certs
    target: makeRoute('asset-service', useSSL),
    // pathRewrite: { '/api/v1/users': '/api/v1/users' },
    logProvider: () => { return logger },
    changeOrigin: true
  }))

// Set up body parser. Must come after the proxy middleware,
// see https://github.com/chimurai/http-proxy-middleware/issues/40#issuecomment-163398924
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up error handling
const errorHandler = new ErrorHandler({ logger })
app.use((req, res, next) => {
  errorHandler.handleError(null, req, res, next)
})

app.use((err, req, res, next) => {
  errorHandler.handleError(err, req, res, next)
})

module.exports = app
