const swaggerJsdoc = require('swagger-jsdoc')
const { version } = require('../../package.json')

const getServiceAPI = (apis) => {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'API Service Documentation',
        version,
        description: 'Swagger documentation for the API Service'
      },
      basePath: '/api',
      tags: [
        { name: 'Info', description: 'Service information' },
        { name: 'Health', description: 'Service health status' },
        { name: 'Metrics', description: 'API metrics' }
      ]
    },
    apis
  }
  return swaggerJsdoc(options)
}

module.exports = {
  getServiceAPI
}
