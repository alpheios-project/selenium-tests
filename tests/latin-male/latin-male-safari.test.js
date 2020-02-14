describe('latin-male-chrome-63.test.js', () => {
  const alph = require('../../src/alph-selenium')
  const alph_tests = require('../../src/alph-selenium-test-cases')
  const versions = require('../../src/alph-config').versions('Safari', ['11.1'])

  let driverChrome
  
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  beforeEach(() => {
  })
  
  afterEach(() => {
  })
  
  versions.forEach(version => {
    it(`should execute male (latin) lookup - ${version.name}`, async () => {
      await alph_tests.simpleLatinLookupTest(version, 'https://texts.alpheios.net')
      console.info(`successfull ${version.name}`)
    }, 5000000)
  })

})

