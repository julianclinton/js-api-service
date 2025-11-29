'use-strict'

const express = require('express')
const promClient = require('prom-client')
const path = require('path')
const config = require('../config')
const appName = require(path.join(config.HOMEDIR, 'package.json')).name

const register = new promClient.Registry()
register.setDefaultLabels({
  app: appName
})
promClient.collectDefaultMetrics({ register })

const router = express.Router()

/**
 * @swagger
 * /metrics:
 *   get:
 *     tags: [Metrics]
 *     summary: Returns application metrics
 *     description: Returns application metrics
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 */
router.get('/', async (req, res) => {
  try {
    const metrics = await register.metrics()
    res.setHeader('Content-Type', register.contentType)
    res.send(metrics)
  } catch (err) {
    res.statusCode = 500
    res.send(err.message)
  }
})

module.exports = router
