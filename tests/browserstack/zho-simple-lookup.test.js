
describe('zho-simple-lookup.test.js', () => {
  const config = require('./config/zho-simple-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env)
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (zho) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (zho) lookup' } ),
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Chinese',
        checkInflections: false,
        chineseLoadedCheck: true
      })
    }, 50000000)
  })

})
