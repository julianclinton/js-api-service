'use-strict'

const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Returns the service status
 *     description: Returns the service status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json
 *         schema:
 *           $ref: '#/definitions/ServiceStatus'
 *         example: '{ status: ''UP'' }'
 */
router.get('/', (req, res) => res.json({ status: 'UP' }))

module.exports = router
