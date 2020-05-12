describe('webextension-test.test.js', () => {
  const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')
  const firefox = require('selenium-webdriver/firefox')
  const chrome = require('selenium-webdriver/chrome')

  let driverChrome
  const timeoutG = 3000

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  beforeEach(() => {
    // const profile = 'C:/_Alpheios/selenium-tests/drivers/firefox-profile2'

    const options = new chrome.Options()
    // .addArguments('--load-extension=C:/_Alpheios/webextension/dist/alph-extension.crx')
    .addExtensions('C:/_Alpheios/selenium-tests/drivers/alph-extension.crx')

     // .addArguments('--auto-open-devtools-for-tabs')
     // .setProfile(profile)
     
     // .setPreference('extensions.firebug.showChromeErrors', true)
     

     driverChrome = new Builder()
      .forBrowser('chrome')
      .setFirefoxOptions(options)
      .build()
      driverChrome.manage().window().maximize()
  })
  
  afterEach(() => {
    // driverFirefox.quit()
  })
  
  it('should execute male (latin) lookup', async () => {
    await driverChrome.get('http://www.thelatinlibrary.com/juvenal/8.shtml')
    // await driverChrome.get('chrome://extensions/')
    /*
    const devModeToggle = await driverChrome.wait(until.elementLocated(By.id('devMode')), 1000)
    await devModeToggle.click()
    */
  }, 5000000)
})
