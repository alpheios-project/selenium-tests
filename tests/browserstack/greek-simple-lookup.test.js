
describe('greek-simple-lookup.test.js', () => {
  const config = require('./config/greek-simple-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env)
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (greek) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (greek) lookup' } ),
        url: testUrl,
        lookupData: config.lookupData,
        lang: 'Greek',
        checkInflections: true,
        buildName: 'Simple (greek) lookup'
      })
    }, 50000000)
  })

})
