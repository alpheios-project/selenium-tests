  
describe('per-simple-lookup.test.js', () => {
  const config = require('./config/per-simple-lookup-config.js') 
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const versions = require('../../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it.skip(`should execute simple (per) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (per) lookup' } ),
        url: config.testUrl,
        lookupData: config.lookupData,
        lang: 'Persian',
        checkInflections: false
      })
    }, 50000000)
  })

})
  