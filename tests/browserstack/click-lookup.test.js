
describe('latin-click-lookup.test.js', () => {
  const config = require('./config/click-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env)
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute click lookup - ${version.name}`, async () => {
      await alph_tests.clickLookupTest({
        capabilities: Object.assign(version, { buildName: 'Click lookup' } ),
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Latin'
      })
    }, 50000000)
  })
})
