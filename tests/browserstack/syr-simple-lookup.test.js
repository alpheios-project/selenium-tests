
describe('syr-simple-lookup.test.js', () => {
  const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')
  const config = require('@tests/browserstack/config/syr-simple-lookup-config.js')
  const alph_tests = require('@src/alph-selenium-test-cases')
  const configurator = require('@src/alph-config')

  const alph = require('@src/alph-selenium')
  const configMain = require('@src/main-config.json')

  const versionsDesktop = configurator.versions(config.env.desktop, 'desktop')
  const versionsMobile = configurator.versions(config.env.mobile, 'mobile')

  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versionsDesktop.forEach(version => {
    it(`should execute simple (syr) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (syr) lookup' } ),
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Syriac',
        checkInflections: false
      })
    }, 50000000)
  })

  versionsMobile.forEach(version => {
    it(`should execute no result (syr) lookup - ${version.name}`, async () => {
      const capabilities = Object.assign(version, { 
      buildName: 'Simple (syr) lookup - mobile',
      realMobile: true,
      // 'browserstack.appium_version': '1.17.0',
      'browserstack.local': false
    } )

    await alph_tests.simpleMobileLookupTest({
      capabilities,
      url: testUrl,
      lookupData: config.lookupData,
      lang: 'Syriac',
      checkInflections: true
    })

    }, 5000000)
  })
})
