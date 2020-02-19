const axios = require('axios')
const osVersions = [
  { 'os' : 'Windows', 'os_version' : '10' },
  { 'os' : 'Windows', 'os_version' : '8.1' },
  { 'os' : 'OS X', 'os_version' : 'High Sierra'},
  { 'os' : 'OS X', 'os_version' : 'Sierra'},
  { 'os' : 'OS X', 'os_version' : 'El Capitan'},
  { 'os' : 'OS X', 'os_version' : 'Mojave'},
  { 'os' : 'OS X', 'os_version' : 'Yosemite'}
]
const browserVersions = [
  { 'browser': 'chrome', 'min_version': 62 },
  { 'browser': 'firefox', 'min_version': 66 },
  { 'browser': 'safari', 'min_version': 8 }
]

const uploadBrowsersData = async () => {
  const result = await axios({
    method: 'GET',
    url: 'https://api.browserstack.com/automate/browsers.json',
    withCredentials: true,
    auth: {
      username: 'bsuser62225',
      password: 'azupMxLR1XptWppiEpeD'
    },
    responseType: 'json',
    responseEncoding: 'utf8'
  })
  return result.data
}

const filterBrowsersData = (allVersions) => {
  return allVersions.filter(version => 
    osVersions.some(checkV => version.os === checkV.os && version['os_version'] === checkV['os_version']) && 
    browserVersions.some(checkV => version.browser === checkV.browser && parseInt(version['browser_version']) >= checkV['min_version'])
  ).map(version => {
    return {
      'os': version.os,
      'os_version': version['os_version'],
      'browser': version.browser,
      'browser_version': version['browser_version'],
      'name': `${version.os} ${version['os_version']} - ${version.browser} ${version['browser_version']}`
    }
  }).sort((a,b) => {
    if (a.browser === b.browser) {
      return (a.browser_version - b.browser_version)
    }
    return a.browser - b.browser
  })
}

const saveJSONToFile = (data) => {
  const fs = require('fs')
  const json = JSON.stringify(data)
  
  fs.writeFile('src/browsers-list.json', json, 'utf8', () => { console.info('Finished') })
}

const getBrowsers = async () => {
  const allVersions = await uploadBrowsersData()
  const finalBrowsers = filterBrowsersData(allVersions)
  saveJSONToFile(finalBrowsers)
}

getBrowsers()