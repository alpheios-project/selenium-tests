
describe('syr-simple-lookup.test.js', () => {
  const config = require('./config/syr-simple-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env, 'desktop')
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
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

})
