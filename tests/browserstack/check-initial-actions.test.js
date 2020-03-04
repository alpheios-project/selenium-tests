  
describe('ara-simple-lookup.test.js', () => {
  const config = require('./config/check-initial-actions-config.js') 
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const versions = require('../../src/alph-config').versions(config.env)
  
  beforeEach(() => {})
  afterEach(() => {})
  
  versions.forEach(version => {
    it(`should execute simple initial actions - ${version.name}`, async () => {
      await alph_tests.simpleInitialActionsTest({
        capabilities: Object.assign(version, { buildName: 'Simple initial actions' } ),
        url: config.testUrl
      })
    }, 50000000)
  })
  
})
    