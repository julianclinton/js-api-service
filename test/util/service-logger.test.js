'use-strict'

const path = require('path')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))

const { ServiceLogger } = require('../../src/util/service-logger')

describe('ServiceLogger', () => {
  const dataDir = path.join(__dirname, '../test-data')

  let testLogger
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    testLogger = new ServiceLogger({ dataDir })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('log4js functions', () => {
    it('trace() calls log4js.trace()', () => {
      sandbox.spy(testLogger.logger)
      testLogger.trace('Some message')
      expect(testLogger.logger.trace).to.have.callCount(1)
    })
    it('debug() calls log4js.debug()', () => {
      sandbox.spy(testLogger.logger)
      testLogger.debug('Some message')
      expect(testLogger.logger.debug).to.have.callCount(1)
    })
    it('info() calls log4js.info()', () => {
      sandbox.spy(testLogger.logger)
      testLogger.info('Some message')
      expect(testLogger.logger.info).to.have.callCount(1)
    })
    it('warn() calls log4js.warn()', () => {
      sandbox.spy(testLogger.logger)
      testLogger.warn('Some message')
      expect(testLogger.logger.warn).to.have.callCount(1)
    })
    it('error() calls log4js.error()', () => {
      sandbox.spy(testLogger.logger)
      testLogger.error('Some message')
      expect(testLogger.logger.error).to.have.callCount(1)
    })
    it('fatal() calls log4js.fatal()', () => {
      sandbox.spy(testLogger.logger)
      testLogger.fatal('Some message')
      expect(testLogger.logger.fatal).to.have.callCount(1)
    })
  })
  it('isTraceEnabled() calls log4js.isTraceEnabled()', () => {
    sandbox.spy(testLogger.logger)
    testLogger.isTraceEnabled()
    expect(testLogger.logger.isTraceEnabled).to.have.callCount(1)
  })
  it('isDebugEnabled() calls log4js.isDebugEnabled()', () => {
    sandbox.spy(testLogger.logger)
    testLogger.isDebugEnabled()
    expect(testLogger.logger.isDebugEnabled).to.have.callCount(1)
  })
  it('isInfoEnabled() calls log4js.isInfoEnabled()', () => {
    sandbox.spy(testLogger.logger)
    testLogger.isInfoEnabled()
    expect(testLogger.logger.isInfoEnabled).to.have.callCount(1)
  })
  it('isWarnEnabled() calls log4js.isWarnEnabled()', () => {
    sandbox.spy(testLogger.logger)
    testLogger.isWarnEnabled()
    expect(testLogger.logger.isWarnEnabled).to.have.callCount(1)
  })
  it('isErrorEnabled() calls log4js.isErrorEnabled()', () => {
    sandbox.spy(testLogger.logger)
    testLogger.isErrorEnabled()
    expect(testLogger.logger.isErrorEnabled).to.have.callCount(1)
  })
  it('isFatalEnabled() calls log4js.isErrorEnabled()', () => {
    sandbox.spy(testLogger.logger)
    testLogger.isFatalEnabled()
    expect(testLogger.logger.isFatalEnabled).to.have.callCount(1)
  })
})
