'use-strict'

/*
jest.mock('express', () => jest.fn(() => {
  return {
    use: jest.fn(),
    listen: jest.fn(),
    Router: jest.fn(() => {
      return {
        get: jest.fn()
      }
    })
  }
}))

jest.mock('express', () => {
  return {
    Router: jest.fn()
  }
})

jest.mock('express', () => ({
  use: jest.fn(),
  listen: jest.fn(),
  Router: () => ({
    get: jest.fn()
  })
}))
*/

// const app = require('../src/app')

describe('app', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
  })

  describe('/v1/api/info', () => {
    it('GET /v1/api/info', (done) => {
      done()
    })
  })
})
