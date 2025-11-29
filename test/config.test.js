'use-strict'

describe('config', () => {
  let testConfig

  beforeEach(() => {
    jest.resetModules()
    delete process.env.NODE_ENV
    testConfig = require('../src/config')
  })

  afterEach(() => {
  })

  describe('NODE_ENV', () => {
    it('NODE_ENV defaults to production', () => {
      expect(testConfig.NODE_ENV).toEqual('production')
    })
    it('NODE_ENV is set when environment variable set', () => {
      jest.resetModules()
      process.env.NODE_ENV = 'development'
      testConfig = require('../src/config')
      expect(testConfig.NODE_ENV).toEqual('development')
    })
  })

  describe('LOG_LEVEL', () => {
    it('LOG_LEVEL defaults to "info" when NODE_ENV is "production"', () => {
      jest.resetModules()
      process.env.NODE_ENV = 'production'
      testConfig = require('../src/config')
      expect(testConfig.LOG_LEVEL).toEqual('info')
    })
    it('LOG_LEVEL defaults to "debug" when NODE_ENV is "production"', () => {
      jest.resetModules()
      process.env.NODE_ENV = 'development'
      testConfig = require('../src/config')
      expect(testConfig.LOG_LEVEL).toEqual('debug')
    })
    it('LOG_LEVEL can be overridden by an environment variable', () => {
      jest.resetModules()
      process.env.LOG_LEVEL = 'trace'
      testConfig = require('../src/config')
      expect(testConfig.LOG_LEVEL).toEqual('trace')
    })
  })

  describe('USE_SSL', () => {
    it('USE_SSL is true when NODE_ENV is "production"', () => {
      jest.resetModules()
      process.env.NODE_ENV = 'production'
      testConfig = require('../src/config')
      expect(testConfig.USE_SSL).toEqual(true)
    })
    it('USE_SSL is false when NODE_ENV is "development"', () => {
      jest.resetModules()
      process.env.NODE_ENV = 'development'
      testConfig = require('../src/config')
      expect(testConfig.USE_SSL).toEqual(false)
    })
  })

  describe('PORT', () => {
    it('PORT defaults to 3001', () => {
      expect(testConfig.PORT).toEqual('3001')
    })
    it('PORT is set correctly SERVER_PORT is specified', () => {
      jest.resetModules()
      process.env.SERVER_PORT = '1234'
      testConfig = require('../src/config')
      expect(testConfig.PORT).toEqual('1234')
    })
  })
})
