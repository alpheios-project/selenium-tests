  
describe('latin-simple-lookup.test.js', () => {
  const config = require('./config/latin-simple-lookup-config.js') 
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const versions = require('../../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute simple (latin) lookup - ${version.name}`, async () => {
      console.info('version - ', version)
      await alph_tests.simpleLookupTest({
        capabilities: Object.assign(version, { buildName: 'Simple (latin) lookup' } ),
        url: config.testUrl,
        lookupData: config.lookupData,
        lang: 'Latin',
        checkInflections: true
      })
    }, 5000000)
  })
})
