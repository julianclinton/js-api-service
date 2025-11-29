'use strict'

/**
 * This class implements a number of administrator endpoints.
 */
class InfoController {
  /**
   * @param {object} options.versionUtil the version utility
   * @param {object} options.logger the logger
   * @constructor
   */
  constructor ({ versionUtil, logger }) {
    this.versionUtil = versionUtil
    this.logger = logger
  }

  /**
   * Sends the name and version of the service in a JSON object.
   * @param {Request} req the request
   * @param {Response} res the response
   */
  getVersion (req, res) {
    const versionInfo = {
      name: this.versionUtil.getPackageName(),
      version: this.versionUtil.getPackageVersion(),
      build: this.versionUtil.getBuildNumber()
    }
    res.json(versionInfo)
  }
}

module.exports = InfoController
