
describe('latin-simple-lookup.test.js', () => {
  const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')
  const config = require('@tests/browserstack/config/latin-simple-lookup-config.js')
  const alph_tests = require('@src/alph-selenium-test-cases')
  const configurator = require('@src/alph-config')

  const alph = require('@src/alph-selenium')
  const configMain = require('@src/main-config.json')

  const versionsDesktop = configurator.versions(config.env.desktop, 'desktop')
  const versionsMobile = configurator.versions(config.env.mobile, 'mobile')

  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  // console.info('versions - ', versions.map(ver => `${ver.browser} ${ver.browser_version} ${ver.os} ${ver.os_version}` ))
  console.info('versionsMobile - ', versionsMobile.map(ver => `${ver.device_browser} ${ver.device} ${ver.os} ${ver.os_version}` ))

  versionsDesktop.forEach(version => {
    it(`should execute simple (latin) lookup - ${version.name}`, async () => {
      console.info('version - ', `${version.browser} ${version.browser_version} ${version.os} ${version.os_version}`)
      // console.info('testUrl - ', testUrl)
      
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (latin) lookup - desktop' } ),
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Latin',
        checkInflections: true
      })
      
    }, 5000000)
  })

  versionsMobile.forEach(version => {
    it(`should execute simple (latin) lookup - ${version.name}`, async () => {
      const capabilities = Object.assign(version, { 
      buildName: 'Simple (latin) lookup - mobile',
      realMobile: true,
      // 'browserstack.appium_version': '1.17.0',
      'browserstack.local': false
    } )

    await alph_tests.simpleMobileLookupTest({
      capabilities,
      url: testUrl,
      lookupData: config.lookupData,
      lang: 'Latin',
      checkInflections: true
    })

    }, 5000000)
  })

})
