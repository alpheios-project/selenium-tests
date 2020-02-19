  
describe('greek-simple-lookup.test.js', () => {
  const config = require('./ara-simple-lookup-config.js') 
  const alph_tests = require('../src/alph-selenium-test-cases')
  const versions = require('../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (ara) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest(version, config.testUrl, config.lookupData, 'Arabic', false)
    }, 5000000)
  })

})
  