'use strict'

/**
 * This class implements a number of version information.
 */
class VersionUtil {
  /**
   * @param {string} options.dataDir the base directory
   * @param {object} options.logger the logger
   * @constructor
   */
  constructor ({ dataDir, logger }) {
    this.dataDir = dataDir
    this.logger = logger
  }

  /**
   * @return {object} the content of 'package.json'
   * @private
   */
  getPackageJSON () {
    if (!this.packageJSON) {
      this.packageJSON = require(this.dataDir + '/package.json')
    }
    return this.packageJSON
  }

  /**
   * @return {object} the content of 'buildInfo.json'
   * @private
   */
  getBuildInfo () {
    if (!this.buildInfo) {
      this.buildInfo = require(this.dataDir + '/buildInfo.json')
    }
    return this.buildInfo
  }

  /**
   * @return {string} the name from 'package.json'
   */
  getPackageName () {
    return this.getPackageJSON().name
  }

  /**
   * @return {string} the version from 'package.json'
   */
  getPackageVersion () {
    return this.getPackageJSON().version
  }

  /**
   * @return {string} the build number from 'buildInfo.json'
   */
  getBuildNumber () {
    return this.getBuildInfo().buildNumber
  }
}

module.exports = VersionUtil
