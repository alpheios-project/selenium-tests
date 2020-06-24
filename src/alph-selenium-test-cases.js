const alph = require('./alph-selenium')
const config = require('./main-config.json')

module.exports = {
  /**
   * @param {Object} params contains test parameters
   * For each item in the params.lookupData list, executes a lookup using the
   * lookup box, verifies lexeme data and  whether or not there are inflections
   * on desktop platforms
   */
  async simpleLookupTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout, 'desktop')
    const loaded = await alph.firstPageLoad(driver, params.url)

    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {

      if (!Array.isArray(params.lookupData)) {
        params.lookupData = [params.lookupData]
      }

      for(let i=0; i<params.lookupData.length; i++) {
        let lookupData = params.lookupData[i]
        await alph.lookupWord(driver, lookupData.clickData, params.lang, i === 0)
        let reload = false

        if (params.chineseLoadedCheck) {
          reload = await alph.doChineseLoadedCheck(driver)
        }

        if (reload) {
          await alph.lookupWordReload(driver)
        }

        if (lookupData.checkData.text) {
          await alph.checkLexemeData(driver, lookupData.checkData, params.chineseLoadedCheck)
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
   * For each item in the params.lookupData list, executes a lookup using the
   * lookup box, verifies lexeme data and  whether or not there are inflections
   * on mobile platforms
   */
  async simpleMobileLookupTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout, 'mobile')
    const loaded = await alph.firstPageLoad(driver, params.url)

    expect(loaded).toBeTruthy()

    if (loaded && params.lookupData) {

      if (!Array.isArray(params.lookupData)) {
        params.lookupData = [params.lookupData]
      }

      for(let i=0; i<params.lookupData.length; i++) {
        let lookupData = params.lookupData[i]

        await alph.lookupWordMobile(driver, lookupData.clickData, params.lang, i === 0)
        let reload = false

        if (params.chineseLoadedCheck) {
          reload = await alph.doChineseLoadedCheckMobile(driver)
        }

        if (reload) {
          await alph.lookupWordReloadMobile(driver)
        }

        if (lookupData.checkData.text) {
          await alph.checkLexemeDataMobile(driver, lookupData.checkData, params.chineseLoadedCheck)
        }
      }

    }
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

        let reload = false

        if (params.chineseLoadedCheck) {
          reload = await alph.doChineseLoadedCheck(driver)
        }

        if (reload) {
          const clickResult = await alph.clickLookupWord(driver, lookupData.clickData, params.lang)
        }

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
   * 
   * on desktop
   */
  async simpleInitialActionsTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)

    expect(loaded).toBeTruthy()

    const resultHelpAction = await alph.checkToolbarHelpAction(driver, params.checkData.help)
    if (!resultHelpAction) {
      await driver.quit()
    }
    expect(resultHelpAction).toBeTruthy()

    const resultInflBrowserAction = await alph.checkToolbarInflBrowserAction(driver, params.checkData.inflBrowser)
    if (!resultInflBrowserAction) {
      await driver.quit()
    }
    expect(resultInflBrowserAction).toBeTruthy()

    const resultGrammarAction = await alph.checkToolbarGrammarAction(driver, params.checkData.grammar)
    if (!resultGrammarAction) {
      await driver.quit()
    }
    expect(resultGrammarAction).toBeTruthy()

    const resultUserAction = await alph.checkToolbarUserAction(driver, params.checkData.user)
    if (!resultUserAction) {
      await driver.quit()
    }
    expect(resultUserAction).toBeTruthy()

    const resultUserOptions = await alph.checkToolbarOptionsAction(driver, params.checkData.options)
    if (!resultUserOptions) {
      await driver.quit()
    }
    expect(resultUserAction).toBeTruthy()

    await driver.quit()
  },


  /**
   * @param {Object} params contains test parameters
   * Tests clicks on:
   * - toolbar help icon
   * - toolbar grammar icon
   * - toolbar user icon
   * - toolbar options icon
   * 
   * on mobile
   */
  async simpleInitialActionsMobileTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout, 'mobile')
    const loaded = await alph.firstPageLoad(driver, params.url)

    expect(loaded).toBeTruthy()

    const resultInflBrowserAction = await alph.checkToolbarInflBrowserActionMobile(driver, params.checkData.inflBrowser)
    if (!resultInflBrowserAction) {
      await driver.quit()
    }
    expect(resultInflBrowserAction).toBeTruthy()

    const resultGrammarAction = await alph.checkToolbarGrammarActionMobile(driver, params.checkData.grammar)
    if (!resultGrammarAction) {
      await driver.quit()
    }
    expect(resultGrammarAction).toBeTruthy()

    const resultUserAction = await alph.checkToolbarUserActionMobile(driver, params.checkData.user)
    if (!resultUserAction) {
      await driver.quit()
    }
    expect(resultUserAction).toBeTruthy()

    const resultUserOptions = await alph.checkToolbarOptionsActionMobile(driver, params.checkData.options)
    if (!resultUserOptions) {
      await driver.quit()
    }
    expect(resultUserAction).toBeTruthy()

    await driver.quit()
  },
  
  /**
   * @param {Object} params contains test parameters
   * For each item in the params.lookupData list, executes a lookup using
   * a single click on the word, verifies:
   *     - verify that the popup has a disamibugated lexeme
   *     - verify that the popup has a treebank icon
   *     - verify that clicking on the treebank icon brings up the tree diagram
   */
  async clickLookupTreebankTest (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout)
    const loaded = await alph.firstPageLoad(driver, params.url)

    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {
      driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");

      if (!Array.isArray(params.lookupData)) {
        params.lookupData = [params.lookupData]
      }

      for(let i=0; i<params.lookupData.length; i++) {
        let lookupData = params.lookupData[i]
        const clickResult = await alph.clickLookupWord(driver, lookupData.clickData, params.lang)

        if (clickResult) {
          await alph.checkHasDisambiguated(driver)
          await alph.checkHasTreebankTab(driver)
        }

      }
    }
    await driver.quit()
  },

    /**
   * @param {Object} params contains test parameters
   * For each item in the params.lookupData list, executes a lookup using
   * a long tap on the word, verifies lexeme data and  whether or not
   * there are inflections
   */
  async clickLookupTestMobile (params) {
    const driver = await alph.defineDriver(params.capabilities, config.auth, params.capabilities.timeout, 'mobile')
    const loaded = await alph.firstPageLoad(driver, params.url)

    expect(loaded).toBeTruthy()
    if (loaded && params.lookupData) {
      if (!Array.isArray(params.lookupData)) {
        params.lookupData = [params.lookupData]
      }

      for(let i=0; i<params.lookupData.length; i++) {
        let lookupData = params.lookupData[i]
        const clickResult = await alph.clickLookupWordMobile(driver, lookupData.clickData, params.lang)
        let reload = false

        if (params.chineseLoadedCheck) {
          reload = await alph.doChineseLoadedCheckMobile(driver)
        }

        if (reload) {
          await alph.lookupWordReloadMobile(driver)
        }

        if (lookupData.checkData.text) {
          await alph.checkLexemeDataMobile(driver, lookupData.checkData, params.chineseLoadedCheck)
        }
      }
    }
    await driver.quit()
  }
}