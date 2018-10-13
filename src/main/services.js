'use strict'

const forever = require('forever')
const Promise = require('bluebird')

Promise.promisifyAll(forever)

function waitForTermination (serviceId) {
  return new Promise((resolve, reject) => {
    function check () {
      resolve()
      // pm2.describeAsync(serviceId)
      //   .then(([description]) => {
      //     if (description.pm2_env.status === 'stopped') {
      //       resolve()
      //     } else {
      //       setTimeout(check, 100)
      //     }
      //   })
      //   .catch(reject)
    }

    check()
  })
}

exports.ServiceManager = class {
  constructor () {
    this.services = {}
    this.pm2ConnectionPromise = null
  }

  _pm2Connect () {
    // if (!this.pm2ConnectionPromise) {
    //   this.pm2ConnectionPromise = pm2.connectAsync(true)
    // }
    //
    // return this.pm2ConnectionPromise
    return Promise.resolve()
  }

  startService (options) {
    const serviceId = options.serviceId || options.serviceName
    const init = options.init || (() => {})

    return Promise.try(init)
      .then(() => forever.start(options.executable, {
        name: serviceId,
        args: options.arguments || [],
        env: options.env || {},
        cwd: options.cwd,
        outFile: options.logPath,
        errFile: options.logPath
      }))
      .return(serviceId)
  }

  checkService (serviceId) {
    return this._pm2Connect()
      .then(() => forever.listAsync(serviceId))
      .then(([description]) => description.pm2_env.status === 'online')
  }

  stopService (serviceId) {
    return this._pm2Connect()
      .then(() => forever.stopAllAsync())
      .then(() => waitForTermination(serviceId))
  }
}
