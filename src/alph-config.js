module.exports = {
  versions (browser, browserV, osV) {
    const allBrowserVersions = {
      'Chrome': ['80.0', '79.0', '78.0', '77.0', '76.0', '75.0', '74.0', '73.0', '72.0', '71.0', '70.0', '69.0', '68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0'],
      'Firefox': ['72.0', '71.0', '70.0', '69.0', '68.0', '67.0', '66.0'],
      'Safari': ['12.1']
    }
    const osVersions = [
      { 'os' : 'Windows', 'version' : '10' },
      { 'os' : 'Windows', 'version' : '8.1' },
      { 'os' : 'OS X', 'version' : 'High Sierra'},
      { 'os' : 'OS X', 'version' : 'Sierra'},
      { 'os' : 'OS X', 'version' : 'El Capitan'},
      { 'os' : 'OS X', 'version' : 'Mojave'},
      { 'os' : 'OS X', 'version' : 'Yosemite'}
    ]

    const allOSVersions = {
      'Chrome': osVersions,
      'Firefox': osVersions,
      'Safari': osVersions.filter(osVer => osVer.os === 'OS X')
    }

    
    const finalOs = osV ? osV : allOSVersions[browser]
    const finalBrowser = browserV ? browserV : allBrowserVersions[browser]
    let versions = []

    if (browser === 'Safari') {
      const safariVer = [
        { 'os' : 'OS X', 'version' : 'High Sierra', 'browserV': '11.1' },
        { 'os' : 'OS X', 'version' : 'Sierra', 'browserV': '10.1' },
        { 'os' : 'OS X', 'version' : 'El Capitan', 'browserV': '9.1' },
        { 'os' : 'OS X', 'version' : 'Mojave', 'browserV': '12.1' },
        { 'os' : 'OS X', 'version' : 'Yosemite', 'browserV': '8.0' }
      ]

      safariVer.forEach(ver => {
        versions.push({
          'browserName' : browser,
          'browser_version' : ver.browserV,
          'os' : ver.os,
          'os_version' : ver.version,
          'name': `${ver.os} ${ver.version} - ${browser} ${ver.browserV}`
        })
      })
    } else {
      finalBrowser.forEach(browserVer => {
        finalOs.forEach(os => {
          versions.push({
            'browserName' : browser,
            'browser_version' : browserVer,
            'os' : os['os'],
            'os_version' : os['version'],
            'name': `${os['os']} ${os['version']} - ${browser} ${browserVer}`
          })
        })
      })
    }
    return versions
  }
}