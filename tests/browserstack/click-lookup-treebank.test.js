
describe('click-lookup-treebank.test.js', () => {
    const config = require('@tests/browserstack/config/click-lookup-treebank-config.js')
    const alph_tests = require('@src/alph-selenium-test-cases')
    const configurator = require('@src/alph-config')
  
    const alph = require('@src/alph-selenium')
    const configMain = require('@src/main-config.json')
  
    const versionsDesktop = configurator.versions(config.env.desktop, 'desktop')
  
    const testUrl = configurator.testUrl(config)
  
    beforeEach(() => {})
    afterEach(() => {})
  
    // console.info('versions', versions)
    versionsDesktop.forEach(version => {
      it(`should execute click lookup and get treebank data - ${version.name}`, async () => {
        const capabilities = Object.assign(version, { buildName: 'Click lookup (treebank) - desktop' } )
        // console.info('capabilities - ', capabilities)
        await alph_tests.clickLookupTreebankTest({
          capabilities,
          url: testUrl,
          lookupData: config.lookupData,
          lang: 'Latin'
        })
      }, 50000000)
    })

    // Treebank feature is unavailable on mobile
  })
  