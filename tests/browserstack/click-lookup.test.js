
describe('click-lookup.test.js', () => {
  const config = require('./config/click-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env, 'desktop')
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  // console.info('versions', versions)
  versions.forEach(version => {
    it(`should execute click lookup - ${version.name}`, async () => {
      const capabilities = Object.assign(version, { buildName: 'Click lookup' } )
      // console.info('capabilities - ', capabilities)
      await alph_tests.clickLookupTest({
        capabilities,
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Latin'
      })
    }, 50000000)
  })
})
