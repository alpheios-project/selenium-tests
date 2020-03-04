  
describe('latin-dblclick-lookup.test.js', () => {
  const config = require('./config/dblclick-lookup-config.js') 
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const versions = require('../../src/alph-config').versions(config.env)

  beforeEach(() => {})
  afterEach(() => {})

  versions.forEach(version => {
    it(`should execute dblclick (click) lookup - ${version.name}`, async () => {
      await alph_tests.dblclickLookupTest({
        capabilities: Object.assign(version, { buildName: 'Dblclick (click) lookup' } ),
        url: config.testUrl,
        lookupData: config.lookupData,
        lang: 'Latin'
      })
    }, 50000000)
  })
})
