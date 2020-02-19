module.exports = {
  versions (env) { 
    let allVersions = require('./browsers-list.json')
    let minBrowserVersion
    
    if (env.minBrowserVersion) {
      minBrowserVersion = parseInt(env.minBrowserVersion)
    }

    allVersions = allVersions.filter(version => {
      let result = true

      if (env.browserName) {
        result = result && version.browser === env.browserName
      }

      if (minBrowserVersion) {
        result = result && parseInt(version['browser_version']) >= minBrowserVersion
      } else if (env.browserVersions) {
        result = result && env.browserVersions.includes(version['browser_version'])
      }

      if (env.osVersions) {
        result = result && env.osVersions.some(envOsVer => envOsVer.os === version.os && envOsVer['os_version'] === version['os_version'])
      }
      return result
    })
    allVersions = allVersions.map(version => {
      return {
        'os': version.os,
        'os_version': version['os_version'],
        'browser': version.browser,
        'browser_version': version['browser_version'],
        'name': `${version.os} ${version['os_version']} - ${version.browser} ${version['browser_version']}`
      }
    }).sort((a,b) => (a.browser_version - b.browser_version))

    return allVersions
  }
}
