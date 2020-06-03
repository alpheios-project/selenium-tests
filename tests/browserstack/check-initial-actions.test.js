
describe('ara-simple-lookup.test.js', () => {
  const config = require('./config/check-initial-actions-config.js')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const configurator = require('../../src/alph-config')
  const versions = configurator.versions(config.env)
  const testUrl = configurator.testUrl(config)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple initial actions - ${version.name}`, async () => {
      await alph_tests.simpleInitialActionsTest({
        capabilities: Object.assign(version, { buildName: 'Simple initial actions' } ),
        url: testUrl,
        checkData: config.checkData
      })
    }, 50000000)
  })

})
