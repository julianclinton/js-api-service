'use strict'

/**
 * This class implements an error handler.
 */
class ErrorHandler {
  /**
   * @param {object} options.logger the logger
   * @constructor
   */
  constructor ({ logger }) {
    this.logger = logger
  }

  /**
   * @param {object} err the error
   * @param {object} req the request
   * @param {object} res the response
   * @param {object} next the continuation function
   */
  handleError (err, req, res, next) {
    if (!err) {
      return res.status(404).send({
        status: 404,
        code: 'not_found',
        message: 'Not found'
      })
    }

    this.logger.error(`handler: status=${err.status} code="${err.code}" message="${err.message}"`)
    let msg = err.message || 'Unspecified error'
    if (err.status === 401) {
      msg = 'Invalid or missing authorization token'
    }

    return res.status(err.status || 500).send({
      status: err.status,
      code: err.code,
      message: msg
    })
    // next(err, req, res);
  }
}

module.exports = ErrorHandler
