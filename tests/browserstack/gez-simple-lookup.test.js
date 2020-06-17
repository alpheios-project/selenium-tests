
describe('gez-simple-lookup.test.js', () => {
  const config = require('./config/gez-simple-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env, 'desktop')
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (gez) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (gez) lookup' } ),
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Ancient Ethiopic (Ge\'ez)',
        checkInflections: false,
        buildName: 'Simple (gez) lookup'
      })
    }, 50000000)
  })

})
