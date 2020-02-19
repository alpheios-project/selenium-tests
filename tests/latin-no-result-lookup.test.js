  
describe('latin-no-result-lookup.test.js', () => {
    const config = require('./latin-no-result-lookup-config.js') 
    const alph_tests = require('../src/alph-selenium-test-cases')
    const versions = require('../src/alph-config').versions(config.env)
  
    beforeEach(() => {})
    afterEach(() => {})
  
    versions.forEach(version => {
      it(`should execute no result (latin) lookup - ${version.name}`, async () => {
        await alph_tests.simpleLookupTest({
          version,
          url: config.testUrl,
          lookupData: config.lookupData,
          lang: 'Latin',
          checkInflections: false
        })
      }, 5000000)
    })
  })
  