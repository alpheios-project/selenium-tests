const config = require('./main-config.json')

module.exports = {

  testUrl(cfg) {
    if (!cfg) {
      cfg = config
    }
    let testUrl = cfg.testUrl
    if (process.env.BRANCH) {
      testUrl = testUrl.replace('index.html',`index-${process.env.BRANCH}.html`)
    }
    return testUrl
  },

  versions (env, type = 'desktop') {
    if (process.env.BRANCH === 'qa') {
      const qaEnv = require('@tests/browserstack/config/qa-config.js')
      env = qaEnv.env[type]
    } else if (!env) {
      env = config.env[type]
    }

    let allVersions = (type === 'desktop') ? require('./desktop-browsers-list.json') : require('./mobile-browsers-list.json')

    let finalVersions = []
    if (!Array.isArray(env)) { env = [env]}

    env.forEach(envItem => {
      let minBrowserVersion

      if (envItem.minBrowserVersion) {
        minBrowserVersion = parseInt(envItem.minBrowserVersion)
      }

      const localVersions = allVersions.filter(version => {
        let result = true

        if (envItem.browserName) {
          result = result && version.browser === envItem.browserName
        }

        if (minBrowserVersion) {
          result = result && parseInt(version['browser_version']) >= minBrowserVersion
        } else if (envItem.browserVersions) {
          result = result && envItem.browserVersions.includes(version['browser_version'])
        }

        if (envItem.osVersions) {
          result = result && envItem.osVersions.some(envOsVer => envOsVer.os === version.os && envOsVer['os_version'] === version['os_version'])
        }

        if (envItem.device) {
          if (!Array.isArray(envItem.device)) { envItem.device = [envItem.device] }
          result = result && envItem.device.some(device => device === version.device || envItem.device_like && version.device.includes(device))
        }

        if (envItem.device_browser) {
          if (!Array.isArray(envItem.device_browser)) { envItem.device_browser = [envItem.device_browser] }
          result = result && envItem.device_browser.some(device_browser => device_browser === version.device_browser)
        }

        return result
      })

      const timeout = envItem.timeout ? envItem.timeout : config.timeout
      localVersions.forEach(version => {
        version.timeout = timeout
        version['browserstack.console'] = envItem['browserstack.console']
      })

      finalVersions = finalVersions.concat(localVersions)
    })

    return finalVersions
  }
}
