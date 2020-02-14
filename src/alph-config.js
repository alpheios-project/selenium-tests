const allChromeVersions = ['80.0', '79.0', '78.0', '77.0', '76.0', '75.0', '74.0', '73.0', '72.0', '71.0', '70.0', '69.0', '68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0']
const allFirefoxVersions = ['72.0', '71.0', '70.0', '69.0', '68.0', '67.0', '66.0']
const allOsVersions = [
  { 'os' : 'Windows', 'osVersion' : '10' },
  { 'os' : 'Windows', 'osVersion' : '8.1' },
  { 'os' : 'OS X', 'osVersion' : 'High Sierra'},
  { 'os' : 'OS X', 'osVersion' : 'Sierra'},
  { 'os' : 'OS X', 'osVersion' : 'El Capitan'},
  { 'os' : 'OS X', 'osVersion' : 'Mojave'},
  { 'os' : 'OS X', 'osVersion' : 'Yosemite'}
]

let allEnvVersions = {
  'Safari': [
    { 'os' : 'OS X', 'osVersion' : 'High Sierra', 'browserVersion': '11.1', name: 'OS X High Sierra - Safari 11.1' },
    { 'os' : 'OS X', 'osVersion' : 'Sierra', 'browserVersion': '10.1', name: 'OS X Sierra - Safari 10.1' },
    { 'os' : 'OS X', 'osVersion' : 'El Capitan', 'browserVersion': '9.1', name: 'OS X El Capitan - Safari 9.1' },
    { 'os' : 'OS X', 'osVersion' : 'Mojave', 'browserVersion': '12.1', name: 'OS X Mojave - Safari 12.1' },
    { 'os' : 'OS X', 'osVersion' : 'Yosemite', 'browserVersion': '8.0', name: 'OS X Yosemite - Safari 8.0' }
  ],
  'Chrome': [],
  'Firefox': []
}

allChromeVersions.forEach(bV => {
  allOsVersions.forEach(osV => {
    allEnvVersions['Chrome'].push({
      os: osV.os, osVersion: osV.osVersion, browserVersion: bV,
      name: `${osV.os} ${osV.osVersion} - Chrome ${bV}`
    })
  })
})

allFirefoxVersions.forEach(bV => {
  allOsVersions.forEach(osV => {
    allEnvVersions['Firefox'].push({
      os: osV.os, osVersion: osV.osVersion, browserVersion: bV,
      name: `${osV.os} ${osV.osVersion} - Firefox ${bV}`
    })
  })
})

module.exports = {
  versions (env) { 
    let currentVersions = allEnvVersions[env.browserName]

    if (env.browserVersions) {
      currentVersions = currentVersions.filter(ver => env.browserVersions.includes(ver.browserVersion))
    }
    if (env.osVersions) {
      currentVersions = currentVersions.filter(ver => {
        return env.osVersions.some(envOsVer => envOsVer.os === ver.os && envOsVer.osVersion === ver.osVersion)
      })
    }
    return currentVersions
  }
}