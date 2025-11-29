'use-strict'
/* eslint-disable no-unused-expressions */

const path = require('path')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))

const InfoController = require('../../src/controllers/info-controller')
const VersionUtil = require('../../src/util/version-util')

describe('InfoController', () => {
  const dataDir = path.join(__dirname, '../test-data')
  let dummyLogger
  let testInfoController

  beforeEach(() => {
    dummyLogger = {
      fatal: sinon.stub(),
      error: sinon.stub(),
      warn: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub(),
      trace: sinon.stub()
    }

    const versionUtil = new VersionUtil({
      dataDir,
      logger: dummyLogger
    })

    testInfoController = new InfoController({
      versionUtil,
      logger: dummyLogger
    })
  })

  afterEach(() => {

  })

  it('getVersion() loads package.json', () => {
    const mockResponse = {
      json: sinon.spy()
    }
    testInfoController.getVersion(null, mockResponse)
    expect(mockResponse.json).to.have.been.called
  })
})
