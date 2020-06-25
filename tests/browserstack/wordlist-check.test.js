
describe('latin-simple-lookup.test.js', () => {
    const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')
    const config = require('@tests/browserstack/config/wordlist-check-config.js')
    const alph_tests = require('@src/alph-selenium-test-cases')
    const configurator = require('@src/alph-config')
  
    const alph = require('@src/alph-selenium')
    const configMain = require('@src/main-config.json')
  
    const versionsDesktop = configurator.versions(config.env.desktop, 'desktop')
    const versionsMobile = configurator.versions(config.env.mobile, 'mobile')
  
    const testUrl = configurator.testUrl(config)
  
    beforeEach(() => {})
    afterEach(() => {})
    
    versionsDesktop.forEach(version => {
      it(`should execute wordlist workflow steps - ${version.name}`, async () => {      
        await alph_tests.wordlistCheckTest({
          capabilities: Object.assign(version, { buildName: 'Wordlist check - desktop' } ),
          url: testUrl,
          wordlistData: config.wordlistData,
          checkInflections: true
        })
        
      }, 5000000)
    })
  
    versionsMobile.forEach(version => {
      it(`should execute wordlist workflow steps - ${version.name}`, async () => {
        const capabilities = Object.assign(version, { 
        buildName: 'Wordlist check - mobile',
        realMobile: true,
        // 'browserstack.appium_version': '1.17.0',
        'browserstack.local': false
      } )
  
      await alph_tests.wordlistCheckTest({
        capabilities,
        url: testUrl,
        wordlistData: config.wordlistData,
        checkInflections: true
      })
  
      }, 5000000)
    })
  
  })
  