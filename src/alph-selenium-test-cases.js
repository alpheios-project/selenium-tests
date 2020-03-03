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
    }
    await driver.quit()
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
        const dblClickResult = await alph.dblclickLookupWord(driver, lookupData.clickData, params.lang)

        if (dblClickResult && lookupData.checkData.text) {
          await alph.checkLexemeData(driver, lookupData.checkData)
        }

        if (dblClickResult && lookupData.checkData.checkInflections) {
          await alph.checkHasInflectionsTab(driver)
        }
      }
    }
    await driver.quit()
  },

  async simpleInitialActionsTest (params) {
    const driver = await alph.defineDriver(params.version, config.auth, params.version.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)
    
    expect(loaded).toBeTruthy()

    const resultHelpAction = await alph.checkToolbarHelpAction(driver)
    if (!resultHelpAction) {
      await driver.quit()
    }
    expect(resultHelpAction).toBeTruthy()

    const resultInflBrowserAction = await alph.checkToolbarInflBrowserAction(driver)
    if (!resultInflBrowserAction) {
      await driver.quit()
    }
    expect(resultInflBrowserAction).toBeTruthy()

    const resultGrammarAction = await alph.checkToolbarGrammarAction(driver)
    if (!resultGrammarAction) {
      await driver.quit()
    }
    expect(resultGrammarAction).toBeTruthy()

    const resultUserAction = await alph.checkToolbarUserAction(driver)
    if (!resultUserAction) {
      await driver.quit()
    }
    expect(resultUserAction).toBeTruthy()

    const resultUserOptions = await alph.checkToolbarOptionsAction(driver)
    if (!resultUserOptions) {
      await driver.quit()
    }
    expect(resultUserAction).toBeTruthy()

    await driver.quit()
  }
  
}