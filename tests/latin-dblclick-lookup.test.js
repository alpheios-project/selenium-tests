  
describe('latin-dblclick-lookup.test.js', () => {
  const config = require('./latin-dblclick-lookup-config.js') 
  const alph_tests = require('../src/alph-selenium-test-cases')
  const versions = require('../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute dblclick (latin) lookup - ${version.name}`, async () => {
      await alph_tests.dblclickLookupTest({
        version,
        url: config.testUrl,
        lookupData: config.lookupData,
        lang: 'Latin'
      })
    }, 5000000)
  })
})
