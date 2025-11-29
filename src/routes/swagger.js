'use-strict'
const express = require('express')
const router = express.Router()
const swaggerUI = require('swagger-ui-express')
const { getServiceAPI } = require('../util/api-util')

// Global definitions
/**
 * @swagger
 * definitions:
 *   ServiceStatus:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *         description: the service status, usually 'UP'
 *
 *   Version:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: the service name
 *       version:
 *         type: string
 *         description: the service version
 *       build:
 *         type: string
 *         description: the service build information
 */

router.use('/', swaggerUI.serve, swaggerUI.setup(getServiceAPI(['./src/routes/*.js']), { explorer: true }))

module.exports = router
