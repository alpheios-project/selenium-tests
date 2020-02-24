const alph = require('./alph-selenium')
const config = require('./main-config.json')

module.exports = {
  async simpleLookupTest (params) {
    const driver = await alph.defineDriver(params.version, config.auth, params.version.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)
    
    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {

      if (!Array.isArray(params.lookupData)) {
        params.lookupData = [params.lookupData]
      }

      for(let i=0; i<params.lookupData.length; i++) {
        let lookupData = params.lookupData[i]
        await alph.lookupWord(driver, lookupData.clickData, params.lang, i === 0)
        
        if (lookupData.checkData.text) {
          await alph.checkLexemeData(driver, lookupData.checkData)
        }

        if (lookupData.checkData.checkInflections) {
          await alph.checkHasInflectionsTab(driver)
        }
      }

      await driver.quit()
    }

  },

  async dblclickLookupTest (params) {
    const driver = await alph.defineDriver(params.version, config.auth, params.version.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)
    
    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {
      if (!Array.isArray(params.lookupData)) {
        params.lookupData = [params.lookupData]
      }

      for(let i=0; i<params.lookupData.length; i++) {
        let lookupData = params.lookupData[i]
        await alph.dblclickLookupWord(driver, lookupData.clickData, params.lang)

        if (lookupData.checkData.text) {
          await alph.checkLexemeData(driver, lookupData.checkData)
        }

        if (lookupData.checkData.checkInflections) {
          await alph.checkHasInflectionsTab(driver)
        }
      }

      await driver.quit()
    }
  }

}