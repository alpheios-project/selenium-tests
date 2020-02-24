const alph = require('./alph-selenium')
const config = require('./main-config.json')

module.exports = {
  async simpleLookupTest (params) {
    const driver = await alph.defineDriver(params.version, config.auth, params.version.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)
    
    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {
      await alph.lookupWord(driver, params.lookupData.targetWord, params.lang)
      
      if (params.lookupData.firstCheck) {
        await alph.checkLexemeData(driver, 1, params.lookupData.firstCheck)
      }
      if (params.lookupData.secondCheck) {
        await alph.checkLexemeData(driver, 2, params.lookupData.secondCheck)
      }

      if (params.checkInflections) {
        await alph.checkHasInflectionsTab(driver)
      }

      await driver.quit()
    }

  },

  async dblclickLookupTest (params) {
    const driver = await alph.defineDriver(params.version, config.auth, params.version.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)
    
    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {
      await alph.dblclickLookupWord(driver, params.lookupData, params.lang)

      if (params.lookupData.firstCheck) {
        await alph.checkLexemeData(driver, 1, params.lookupData.firstCheck)
      }

      await driver.quit()
    }
  }

}