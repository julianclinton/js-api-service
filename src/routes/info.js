'use-strict'

const express = require('express')
const VersionUtil = require('../util/version-util')
const InfoController = require('../controllers/info-controller')
const { logger } = require('../util/service-logger')
const path = require('path')

const router = express.Router()

const versionUtil = new VersionUtil({
  dataDir: path.join(__dirname, '../..'),
  logger
})

const infoController = new InfoController({
  versionUtil,
  logger
})

/**
 * @swagger
 * /info:
 *   get:
 *     tags: [Info]
 *     summary: Returns the service version
 *     description: Returns the service version
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json
 *         schema:
 *           $ref: '#/definitions/Version'
 */
router.get('/', (req, res) => infoController.getVersion(req, res))

module.exports = router
