  
describe('gez-simple-lookup.test.js', () => {
  const config = require('./gez-simple-lookup-config.js') 
  const alph_tests = require('../src/alph-selenium-test-cases')
  const versions = require('../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (gez) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest({
        version,
        url: config.testUrl,
        lookupData: config.lookupData,
        lang: 'Ancient Ethiopic (Ge\'ez - Experimental)',
        checkInflections: false
      })
    }, 50000000)
  })

})
  