
describe('ara-simple-lookup.test.js', () => {
  const config = require('./config/ara-simple-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env, 'desktop')
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (ara) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (ara) lookup' } ),
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Arabic',
        checkInflections: false
      })
    }, 50000000)
  })

})
