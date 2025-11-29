'use-strict'
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))

const ErrorHandler = require('../../src/util/error-handler')

describe('ErrorHandler', () => {
  let mockLogger
  let mockResponse
  let testErrorHandler

  beforeEach(() => {
    mockLogger = {
      error: sinon.stub(),
      warn: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub(),
      trace: sinon.stub()
    }

    mockResponse = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    }

    testErrorHandler = new ErrorHandler({
      logger: mockLogger
    })
  })

  afterEach(() => {

  })

  it('should send a 404 when no error supplied', () => {
    testErrorHandler.handleError(null, null, mockResponse, null)
    expect(mockResponse.status).to.have.been.calledWith(404)
  })
  it('should have message for 401 status', () => {
    const error = new Error()
    error.status = 401
    testErrorHandler.handleError(error, null, mockResponse, null)
    expect(mockResponse.status).to.have.been.calledWith(401)
  })
  it('log error when handleError called', () => {
    const error = new Error()
    testErrorHandler.handleError(error, null, mockResponse, null)
    expect(mockLogger.error).to.have.been.called
  })
})
