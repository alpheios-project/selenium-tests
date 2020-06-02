
describe('latin-no-result-lookup.test.js', () => {
  const config = require('./config/latin-no-result-lookup-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env)
  const testUrl = configurator.testUrl(config)

    beforeEach(() => {})
    afterEach(() => {})

    versions.forEach(version => {
      it(`should execute no result (latin) lookup - ${version.name}`, async () => {
        await alph_tests.simpleLookupTest({
          capabilities: Object.assign(version, { buildName: 'No result (latin) lookup' } ),
          url: testUrl,
          lookupData: config.lookupData,
          lang: 'Latin',
          checkInflections: false
        })
      }, 5000000)
    })
  })
