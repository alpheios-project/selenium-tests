
describe('click-lookup.test.js', () => {
  const config = require('@tests/browserstack/config/click-lookup-config.js')
  const alph_tests = require('@src/alph-selenium-test-cases')
  const configurator = require('@src/alph-config')

  const alph = require('@src/alph-selenium')
  const configMain = require('@src/main-config.json')

  const versionsDesktop = configurator.versions(config.env.desktop, 'desktop')
  const versionsMobile = configurator.versions(config.env.mobile, 'mobile')

  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  // console.info('versions', versions)
  versionsDesktop.forEach(version => {
    it.skip(`should execute click lookup - ${version.name}`, async () => {
      const capabilities = Object.assign(version, { buildName: 'Click lookup - desktop' } )
      // console.info('capabilities - ', capabilities)
      await alph_tests.clickLookupTest({
        capabilities,
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Latin'
      })
    }, 50000000)
  })

  // console.info('versionsMobile - ', versionsMobile.map(ver => `${ver.device_browser} ${ver.device} ${ver.os} ${ver.os_version}` ))

  versionsMobile.forEach(version => {
    it(`should execute click lookup - ${version.name}`, async () => {
      const capabilities = Object.assign(version, { 
      buildName: 'Click lookup - mobile',
      realMobile: true,
      // 'browserstack.appium_version': '1.17.0',
      'browserstack.local': false,
      nativeWebTap: true
    } )

    await alph_tests.clickLookupTestMobile({
      capabilities,
      url: testUrl,
      lookupData: config.lookupData,
      lang: 'Latin'
    })

    }, 5000000)
  })
})
