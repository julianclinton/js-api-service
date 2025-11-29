'use-strict'
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const path = require('path')

const VersionUtil = require('../../src/util/version-util')

describe('VersionUtil', () => {
  const dataDir = path.join(__dirname, '../test-data')
  let dummyLogger
  let testVersionUtil

  beforeEach(() => {
    dummyLogger = {
      fatal: sinon.stub(),
      error: sinon.stub(),
      warn: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub(),
      trace: sinon.stub()
    }

    testVersionUtil = new VersionUtil({
      dataDir: dataDir,
      logger: dummyLogger
    })
  })

  afterEach(() => {

  })

  it('fetch name from package.json', () => {
    expect(testVersionUtil.getPackageName()).equals('dummy-service-name')
  })

  it('fetch version from package.json', () => {
    expect(testVersionUtil.getPackageVersion()).equals('-1.2.3')
  })

  it('getBuildInfo() loads buildInfo.json and caches it', () => {
    expect(testVersionUtil.buildInfo).equals(undefined)
    expect(testVersionUtil.getBuildInfo()).to.have.property('buildNumber', 'dummy-build-number')
    expect(testVersionUtil.buildInfo).not.equals(undefined)
    expect(testVersionUtil.getBuildInfo()).to.have.property('buildNumber', 'dummy-build-number')
  })

  it('fetch build number from buildInfo.json', () => {
    expect(testVersionUtil.getBuildNumber()).equals('dummy-build-number')
  })
})
