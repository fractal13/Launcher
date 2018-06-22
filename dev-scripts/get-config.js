'use strict'

const { getMhub } = require('./.get/get-mhub')
const { getCaddy } = require('./.get/get-caddy')
const { getMongo } = require('./.get/get-mongo')
const { getNpmModule } = require('./.get/get-npm-module')
const { getByHttp } = require('./.get/get-by-http')

// eslint-disable-next-line node/exports-style
module.exports = {
  modules: {
    caddy: {
      internal: true,
      get: getCaddy
    },
    mongo: {
      internal: true,
      get: getMongo
    },
    mhub: {
      internal: true,
      get: getMhub,
      options: {
        package: 'mhub',
        version: '0.9.1'
      }
    },
    scoring2: {
      get: getNpmModule,
      options: {
        version: 'FirstLegoLeague/scoring#dev/standard'
      }
    },
    schedule: {
      get: getNpmModule,
      options: {
        version: 'FirstLegoLeague/schedule#master'
      }
    }
  },
  custom: {
    npm: getNpmModule,
    http: getByHttp
  }
}
