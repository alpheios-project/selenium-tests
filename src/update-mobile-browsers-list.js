const axios = require('axios')
const config = require('./main-config.json')

const finalJson = 'src/mobile-browsers-list.json'

const uploadBrowsersData = async () => {
  const result = await axios({
    method: 'GET',
    url: 'https://api.browserstack.com/automate/browsers.json',
    withCredentials: true,
    auth: config.auth,
    responseType: 'json',
    responseEncoding: 'utf8'
  })
  return result.data
}

const saveJSONToFile = (data) => {
  const fs = require('fs')
  const json = JSON.stringify(data)
    
  fs.writeFile(finalJson, json, 'utf8', () => { console.info('Finished') })
}

const filterBrowsersData = (allVersions) => {
  const availableBrowsers = {
    'Samsung': ['chrome', 'firefox'],
    'Google': ['chrome', 'firefox'],
    'OnePlus': ['chrome', 'firefox'],
    'Motorola': ['chrome', 'firefox'],
    'Xiaomi': ['chrome', 'firefox'],
    'LG': ['chrome', 'firefox'],
    'Xperia': ['chrome', 'firefox']
  }

  let finalVersions = []

  allVersions.filter(version => version['real_mobile']).forEach(version => {
    const typeBrowsers = Object.keys(availableBrowsers).filter(typeBrowser => version.device.includes(typeBrowser))
    const browsers = availableBrowsers[typeBrowsers]

    if (browsers) {
      browsers.forEach(browser => {
        finalVersions.push({
          'os': version.os,
          'os_version': version['os_version'],
          'browser': version.browser,
          'browser_version': version['browser_version'],
          'device': version.device,
          'device_browser': browser,
          'name': `${version.device} ${version.os} ${version['os_version']} - ${browser}`
        })
      })
    }
  })

  return finalVersions.sort((a,b) => { return (a.device - b.device)})
}

const getBrowsers = async () => {
  const allVersions = await uploadBrowsersData()
  const finalBrowsers = filterBrowsersData(allVersions)
  saveJSONToFile(finalBrowsers)
}
  
getBrowsers()