  
describe('latin-simple-lookup.test.js', () => {
  const config = require('./latin-simple-lookup-config.js') 
  const alph_tests = require('../src/alph-selenium-test-cases')
  const versions = require('../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (latin) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLatinLookupTest(version, config.testUrl, config.creds, config.lookupData)
      // console.info(`successfull ${version.name}`)
    }, 5000000)
  })
})
