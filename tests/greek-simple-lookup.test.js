  
describe('greek-simple-lookup.test.js', () => {
  const config = require('./greek-simple-lookup-config.js') 
  const alph_tests = require('../src/alph-selenium-test-cases')
  const versions = require('../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (greek) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLookupTest(version, config.testUrl, config.lookupData, 'Greek')
      // console.info(`successfull ${version.name}`)
    }, 5000000)
  })
})
  