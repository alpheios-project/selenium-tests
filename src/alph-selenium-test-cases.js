const alph = require('./alph-selenium')
const config = require('./main-config.json')

module.exports = {
  /**
   * @param {Object} params contains test parameters
   * For each item in the params.lookupData list, executes a lookup using the
   * lookup box, verifies lexeme data and  whether or not there are inflections
   */
  async simpleLookupTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout)
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

  /**
   * @param {Object} params contains test parameters
   * For each item in the params.lookupData list, executes a lookup using
   * a single click on the word, verifies lexeme data and  whether or not
   * there are inflections
   */
  async clickLookupTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)

    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {
      if (!Array.isArray(params.lookupData)) {
        params.lookupData = [params.lookupData]
      }

      for(let i=0; i<params.lookupData.length; i++) {
        let lookupData = params.lookupData[i]
        const clickResult = await alph.clickLookupWord(driver, lookupData.clickData, params.lang)

        if (clickResult && lookupData.checkData.text) {
          await alph.checkLexemeData(driver, lookupData.checkData)
        }

        if (clickResult && lookupData.checkData.checkInflections) {
          await alph.checkHasInflectionsTab(driver)
        }
      }
    }
    await driver.quit()
  },

  /**
   * @param {Object} params contains test parameters
   * Tests clicks on:
   * - toolbar help icon
   * - toolbar grammar icon
   * - toolbar user icon
   * - toolbar options icon
   */
  async simpleInitialActionsTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout)
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