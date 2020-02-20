const config = require('./main-config.json')

module.exports = {
  versions (env) { 
    if (!env) {
      env = config.env
    }

    let allVersions = require('./browsers-list.json')

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
        return result
      })

      const timeout = envItem.timeout ? envItem.timeout : config.timeout
      localVersions.forEach(version => { version.timeout = timeout })

      finalVersions = finalVersions.concat(localVersions)
    })

    
    return finalVersions
  }
}
