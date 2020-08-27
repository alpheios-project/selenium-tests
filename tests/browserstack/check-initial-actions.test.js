
describe('check-initial-actions.test.js', () => {
  const config = require('@tests/browserstack/config/check-initial-actions-config.js')
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
    it(`should execute simple initial actions - ${version.name}`, async () => {
      await alph_tests.simpleInitialActionsTest({
        capabilities: Object.assign(version, { buildName: 'Simple initial actions - desktop' } ),
        url: testUrl,
        checkData: config.checkData
      })
    }, 50000000)
  })

  versionsMobile.forEach(version => {
    it(`should execute simple initial actions - ${version.name}`, async () => {
      const capabilities = Object.assign(version, {
      buildName: 'Simple initial actions - mobile',
      realMobile: true,
      // 'browserstack.appium_version': '1.17.0',
      'browserstack.local': false
    } )

    await alph_tests.simpleInitialActionsMobileTest({
      capabilities,
      url: testUrl,
      checkData: config.checkData
    })

    }, 5000000)
  })
})
