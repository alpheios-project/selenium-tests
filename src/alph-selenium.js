const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')
require('./fast-selenium.js')

const basicCapabilities = {
  'browserName' : 'Chrome',
  'browser_version' : '79.0',
  'os' : 'Windows',
  'os_version' : '10',
  'resolution' : '1280x1024',
  'name' : 'Alpeios Test',
  'acceptSslCerts' : 'true',
  'browserstack.debug' : 'true',
  'projectName': 'Alpheios Testing',
  'buildName': 'Double click test',
  'video': false/*,
  chromeOptions: {
    args: ['--auto-open-devtools-for-tabs']
  }*/
}

let timeoutG = require('./main-config.json').timeout

module.exports = {
  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  currentDate () {
    let dt = new Date()
    return dt.getFullYear() + '-'
        + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '-'
        + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + '@'
                + ((dt.getHours() < 10) ? '0' : '') + dt.getHours() + "-"
                + ((dt.getMinutes() < 10) ? '0' : '') + dt.getMinutes() + "-"
                + ((dt.getSeconds() < 10) ? '0' : '') + dt.getSeconds()

  },

  today () {
    let dt = new Date()
    return dt.getFullYear() + '/'
        + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '/'
        + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() 

  },

  async takeTestScreenshot (driver, prev = '') {
    const fs = require('fs')
    const img = await driver.takeScreenshot()

    const imgFileName = `tests/browserstack/screens/${prev}-screenshot-${this.currentDate()}.png`
    fs.writeFile(imgFileName, img, 'base64', (err) => {
      if (err) { console.error(err) } else { console.info('Finished') }
    })
  },

  async defineDriver (capabilities, creds, timeout, type = 'desktop') {
    let capabilitiesCurrent = Object.assign(basicCapabilities, capabilities)

    capabilitiesCurrent = Object.assign(capabilitiesCurrent, {
      'browserstack.user': creds.username,
      'browserstack.key': creds.password
    })

    driver = new Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilitiesCurrent)
      .build()

    if (type === 'desktop') {
      driver.manage().window().maximize()
    }

    const sessionData = await driver.getSession()
    expect(sessionData.id_).not.toBeNull()

    timeoutG = timeout
    return driver
  },

  async goToUrl (driver, url) {
    await driver.get(url)
  },

  async checkAlpehiosLoaded (driver) {
    let toolbar =
       await driver.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4)
    return toolbar
  },

  async firstPageLoad (driver, url) {
    await this.goToUrl(driver, url)
    let loaded = true
    try {
      await this.checkAlpehiosLoaded(driver) 
    } catch (err) {
      loaded = false
    }
    return loaded
  },

  async activateLookup (driver) {
    const toolbar =
      await driver.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4)

    const lookupIconToolbar = await toolbar.findElement(By.id('alpheios-toolbar-navbuttons-lookup'))
    await lookupIconToolbar.click()

    const lookupFormToolbar =  await driver.wait(until.elementLocated(By.id('alpheios-lookup-form')), timeoutG * 2)
    
    const lookupInputToolbar = await lookupFormToolbar.findElement(By.id('alpheios-lookup-form-input__toolbar'))

    return { form: lookupFormToolbar, input: lookupInputToolbar }
  },

  async activateLookupMobile (driver) {
    const toolbar =
      await driver.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4)
    await toolbar.click()

    const lookupFormToolbar =  await driver.wait(until.elementLocated(By.id('alpheios-lookup-form')), timeoutG * 2)

    const lookupFormToolbarIsDisplayed = await lookupFormToolbar.isDisplayed()

    const lookupInputToolbar = await lookupFormToolbar.findElement(By.id('alpheios-lookup-form-input__action-panel'))

    return { form: lookupFormToolbar, input: lookupInputToolbar }
  },

  async checkAndClosePanel (driver) {
    const panel = await driver.findElement(By.id('alpheios-panel-inner'))
    const displayedPanel = await panel.isDisplayed()

    if (displayedPanel) {
      const panelHeader = await panel.findElement(By.id('alpheios-panel-header'))

      const panelCloseButton = await panelHeader.findElement(By.id('alpheios-panel-close-btn'))

      await panelCloseButton.click()
      await driver.wait(until.elementIsNotVisible(panel), timeoutG * 2)
    }
  },

  async checkAndClosePanelMobile (driver) {
    const panel = await driver.findElement(By.id('alpheios-panel-inner'))
    const displayedPanel = await panel.isDisplayed()

    if (displayedPanel) {
      const panelHeader = await panel.findElement(By.className('alpheios-panel__header'))

      const panelCloseButton = await panelHeader.findElement(By.className('alpheios-panel__close-btn'))

      await panelCloseButton.click()
      await driver.wait(until.elementIsNotVisible(panel), timeoutG * 2)
    }
  },

  async checkAndClosePopup (driver) {
    const popup = await driver.findElement(By.id('alpheios-popup-inner'))
    const displayedPopup = await popup.isDisplayed()

    if (displayedPopup) {
      const popupHeader = await popup.findElement(By.id('alpheios-popup-header'))
      const popupCloseButton = await popupHeader.findElement(By.id('alpheios-popup-toolbar-btn-close'))

      await popupCloseButton.click()
      await driver.wait(until.elementIsNotVisible(popup), timeoutG * 2)
    }
  },


  async getLookupBlock (driver) {
    const toolbar = await driver.findElement(By.id('alpheios-toolbar-inner'))
    const lookupFormToolbar = await toolbar.findElement(By.id('alpheios-lookup-form'))
    const lookupInputToolbar = await lookupFormToolbar.findElement(By.id('alpheios-lookup-form-input__toolbar'))

    let checkDisplayed = await lookupInputToolbar.isDisplayed()
    if (!checkDisplayed) {
      await this.checkAndClosePanel(driver)
    }
    checkDisplayed = await lookupInputToolbar.isDisplayed()
    return { form: lookupFormToolbar, input: lookupInputToolbar }
  },

  async getLookupBlockMobile (driver) {
    const lookupFormToolbar = await driver.findElement(By.id('alpheios-lookup-form'))
    const lookupInputToolbar = await lookupFormToolbar.findElement(By.id('alpheios-lookup-form-input__action-panel'))

    let checkDisplayed = await lookupInputToolbar.isDisplayed()
    if (!checkDisplayed) {
      await this.checkAndClosePanelMobile(driver)
    }
    checkDisplayed = await lookupInputToolbar.isDisplayed()
    return { form: lookupFormToolbar, input: lookupInputToolbar }
  },

  async checkLanguageInLookup (driver, form, lang) {
    const langHint = await driver.findElement(By.id('alpheios-lookup-form-lang-hint'))
    let langHint_text = await langHint.getText()
    langHint_text = langHint_text.replace('(', '').replace(')', '')

    if (langHint_text) {
      return langHint_text === lang
    } else {
      const langSelect = await driver.findElement(By.id('alpheios-feature-options__2__lookupLanguage-id'))
      const langSelectValue = await langSelect.getAttribute('value')
      return langSelectValue === lang
    }
    
  },

  async changeLookupLanguage (driver, form, lang) {
    const langChangeLink = await form.findElement(By.id('alpheios-lookup-form-lang-change'))

    if (langChangeLink.isDisplayed()) {
      langChangeLink.click()
      const langChangeSelect = await form.findElement(By.className('alpheios-setting__control'))
      const result = await this.changeSelectedOption(driver, langChangeSelect, lang)
      return result
    }

    return true
  },

  async changeSelectedOption (driver, selectElement, optionValue) {
    await selectElement.click()
    const selectElement_text = await selectElement.getText()

    const options = await selectElement.findElements(By.css('option'))

    let desiredOption

    for(let i = 0; i < options.length; i++) {
      const option_text = await options[i].getText()
      if (option_text === optionValue) {
        desiredOption = options[i]
        break
      }
    }

    if (desiredOption) {
      testText = await desiredOption.getText()
      await desiredOption.click()
      return true
    }

    return false
  },

  async lookupWordReload(driver) {
    const lookupBlock = await this.getLookupBlock(driver)
    const lookupFormButtonToolbar = await lookupBlock.form.findElement(By.id('alpheios-lookup-form-button'))
    await lookupFormButtonToolbar.click()
  },

  async lookupWordReloadMobile(driver) {
    const lookupBlock = await this.getLookupBlockMobile(driver)
    const lookupFormButtonToolbar = await lookupBlock.form.findElement(By.id('alpheios-lookup-form-button'))
    await lookupFormButtonToolbar.click()
  },

  async lookupWord (driver, clickData, lang, needActivation = true) {
    await this.checkAndClosePopup(driver)
    await this.checkAndClosePanel(driver)

    let resChangeLang = true
    let lookupBlock

    const targetWord = clickData.word ? clickData.word : clickData

    if (needActivation) {
      lookupBlock = await this.activateLookup(driver)
    } else {
      lookupBlock = await this.getLookupBlock(driver)
    }

    let resLangCheck = await this.checkLanguageInLookup(driver, lookupBlock.form, lang)
    console.info('lookupWord - resLangCheck', resLangCheck)

    if (!resLangCheck) {
      resChangeLang = await this.changeLookupLanguage(driver, lookupBlock.form, lang)
      console.info('lookupWord - resChangeLang inside', resChangeLang)
    }

    expect(resChangeLang).toBeTruthy()
    if (resChangeLang) {
      await lookupBlock.input.click()
      await lookupBlock.input.sendKeys(targetWord)
      // await lookupBlock.input.sendKeys(Key.RETURN)

      const lookupFormButtonToolbar = await lookupBlock.form.findElement(By.id('alpheios-lookup-form-button'))
      await lookupFormButtonToolbar.click()
    }
  },

  async lookupWordMobile (driver, clickData, lang, needActivation = true) {
    let resChangeLang = true
    let lookupBlock

    if (needActivation) {
      lookupBlock = await this.activateLookupMobile(driver)
      let resLangCheck = await this.checkLanguageInLookup(driver, lookupBlock.form, lang)

      if (!resLangCheck) {
        resChangeLang = await this.changeLookupLanguage(driver, lookupBlock.form, lang)
      }

      expect(resChangeLang).toBeTruthy()
    } else {
      lookupBlock = await this.getLookupBlockMobile(driver)
    }

    if (resChangeLang) {
      await lookupBlock.input.click()
      await lookupBlock.input.sendKeys(clickData.word)
      // await lookupBlock.input.sendKeys(Key.RETURN)
      
      const lookupFormButtonToolbar = await lookupBlock.form.findElement(By.id('alpheios-lookup-form-button'))
      await lookupFormButtonToolbar.click()
      
    }
  },

  async clickLookupWord (driver, clickData, lang) {
    await this.checkAndClosePopup(driver)
    await this.checkAndClosePanel(driver)

    const clickPathId = clickData.path.substring(1)
    
    await driver.executeScript(`var element = document.getElementById("${clickPathId}"); element.scrollIntoView();`)
    const textPartForLookup = await driver.findElement(By.css(clickData.path))

    if (textPartForLookup) {
      await textPartForLookup.click()
      return true
    } else {
      console.error(`There is no text by path ${clickData.path}, it could not be clicked.`)
    }
    return false
  },


  async clickLookupWordMobile (driver, clickData, lang) {
    await this.checkAndClosePanelMobile(driver)

    const clickPathId = clickData.path.substring(1)
    await driver.executeScript(`var element = document.getElementById("${clickPathId}"); element.scrollIntoView();`)
    const textPartForLookup = await driver.findElement(By.css(clickData.path))

    if (textPartForLookup) {
      await textPartForLookup.click()
      return true
    } else {
      console.error(`There is no text by path ${clickData.path}, it could not be clicked.`)
      expect(textPartForLookup.length).toBeGreaterThan(num)
    }
    return false
  },

  

  async checkLexemeData (driver, checkData) {
    const popup = await driver.wait(until.elementLocated(By.id('alpheios-popup-inner')), timeoutG * 4);

    const popupContent = await driver.wait(until.elementLocated(By.className('alpheios-popup__content')), timeoutG * 4);
    await popupContent.click()
    const popupSelection = await driver.wait(until.elementLocated(By.className('alpheios-popup__toolbar-text')), timeoutG * 4);
    let popupSelection_text = await popupSelection.getText()
    popupSelection_text = popupSelection_text.replace(' ', '').trim()

    await popupContent.click()
    const popup_text = await popup.getText()

    const popupDictentry = await driver.wait(until.elementLocated(By.className('alpheios-morph__dictentry')), timeoutG * 4);
    const popupDictentry_text = await popupDictentry.getText()


    let hasCorrectTargetWord = true
    if (checkData.targetWord && popupSelection_text  !== checkData.targetWord) {

      console.error(`TargetWord "${checkData.targetWord}" is not the same as in popup - "${popupSelection_text}"`)
      hasCorrectTargetWord = false
      expect(hasCorrectTargetWord).toBeTruthy()
    }

    if (hasCorrectTargetWord) {
      if (!Array.isArray(checkData.text)) { checkData.text = [checkData.text] }
      
      let sourcePopupText = await popupContent.getText()
      sourcePopupText = sourcePopupText.replace(/\s{2,}/g, ' ').trim()

      checkData.text.forEach(text => {
        const result = this.checkTextFromPopup(sourcePopupText, text)

        if (!result.finalLexemeCheck) {
          console.error(`Check text - "${result.text}", was not found in the source - "${result.sourcePopupText}"`)
        } else {
          console.info(`Check text - "${result.text}", was found in the source`)
        }
        expect(result.finalLexemeCheck).toBeTruthy()
      })
    }
  },

  async checkLexemeDataMobile (driver, checkData) {
    const popup = await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4);

    const popupContent = await driver.wait(until.elementLocated(By.className('alpheios-panel__content')), timeoutG * 4);

    try {
      const popupDictentry = await driver.wait(until.elementLocated(By.className('alpheios-morph-definitions_list__definition')), timeoutG * 4);
      const popupDictentry_text = await popupDictentry.getText()
    } catch (e) {
      console.error(e)
    }

    const popupSelection = await driver.wait(until.elementLocated(By.id('alpheios-panel__lex-data-container')), timeoutG * 4);
    const popupSelection_isDisplayed = await popupSelection.isDisplayed()

    let popup_text
    if (popupSelection_isDisplayed) {
      popup_text = await popupSelection.getText()
    } else {
      const popupSelectionDefs = await driver.wait(until.elementLocated(By.className('alpheios-panel__tab-panel')), timeoutG * 4);
      popup_text = await popupSelectionDefs.getText()
    }

    if (!Array.isArray(checkData.text)) { checkData.text = [checkData.text] }

    checkData.text.forEach(text => {
      const result = this.checkTextFromPopup(popup_text, text)

      if (!result.finalLexemeCheck) {
        console.error(`Check text - "${result.text}", was not found in the source - "${popup_text}"`)
      } else {
        console.info(`Check text - "${result.text}", was found in the source`)
      }
      expect(result.finalLexemeCheck).toBeTruthy()
    })
  },

  async doChineseLoadedCheck (driver) {
    let popup = await driver.wait(until.elementLocated(By.id('alpheios-popup-inner')), timeoutG * 4);
    let sourcePopupText = await popup.getText()

    const checkTextNotLoaded = 'Chinese data has not been loaded yet. Do you want to load it?'
    if (sourcePopupText.includes(checkTextNotLoaded)) {
      const loadChineseButton = await popup.findElement(By.css('.alpheios-button.alpheios-notification-area__hint-btn')) 
      await loadChineseButton.click()

      const cedictLoadedHint = await driver.wait(until.elementLocated(By.className('alpheios-notification-area__notification--cedict-loaded')), timeoutG * 25);

      await this.checkAndClosePopup(driver)
      return true
    }
    return false
  },

  async doChineseLoadedCheckMobile (driver) {
    let panel = await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4);
    let sourcePanelText = await panel.getText()

    const checkTextNotLoaded = 'Chinese data has not been loaded yet. Do you want to load it?'
    if (sourcePanelText.includes(checkTextNotLoaded)) {
      const loadChineseButton = await panel.findElement(By.css('.alpheios-button.alpheios-notification-area__hint-btn')) 
      await loadChineseButton.click()

      const cedictLoadedHint = await driver.wait(until.elementLocated(By.className('alpheios-notification-area__notification--cedict-loaded')), timeoutG * 25);

      await this.checkAndClosePanelMobile(driver)
      return true
    }
    return false
  },

  checkTextFromPopup (sourcePopupText, text) {
    let finalLexemeCheck = false

    finalLexemeCheck = sourcePopupText.includes(text)

    if (!finalLexemeCheck) {
      let removePunctuation = [',', ';']

      for (let i=0; i<removePunctuation.length; i++) {
        text = text.replace(removePunctuation[i], ' ').replace(/\s{2,}/g, ' ').trim()
        sourcePopupText = sourcePopupText.replace(removePunctuation[i], ' ').replace(/\s{2,}/g, ' ').trim()
        finalLexemeCheck = sourcePopupText.includes(text)

        if (finalLexemeCheck) {
          break
        }
      }
    }
    return { finalLexemeCheck, sourcePopupText, text }
  },

  async checkHasInflectionsTab (driver) {
    const popup = await driver.findElement(By.id('alpheios-popup-inner'))

    let loadedInflButton = true
    try {
      const popupToolbarInflButton = await popup.findElement(By.css('.alpheios-popup__toolbar-buttons > div:nth-child(2)'))
      await popupToolbarInflButton.click()
    } catch (err) {
      loadedInflButton = false
      const sessionData = await driver.getSession()
      if (sessionData) {
        await driver.quit()
      }
    }

    expect(loadedInflButton).toBeTruthy()

    if (loadedInflButton) {
      const panel = await driver.findElement(By.id('alpheios-panel__inflections-panel'))
      const panelTitle = await panel.findElement(By.css('h1.alpheios-panel__title'))

      let panelTitleText = await panelTitle.getText()
      panelTitleText = panelTitleText.replace(/[^\x20-\x7E]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
      expect(panelTitleText.toLowerCase()).toEqual('inflection tables')
    }
  },

  async checkToolbarHelpAction (driver, checkText) {
    await this.checkAndClosePanel(driver)
    const toolbarBtnHelp = await driver.wait(until.elementLocated(By.id('alpheios-toolbar-navbuttons-info')), timeoutG * 4)
    await toolbarBtnHelp.click()

    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()

    return checkText.every(text => panelText.includes(text))
  },

  async checkToolbarInflBrowserAction (driver, checkText) {
    await this.checkAndClosePanel(driver)
    const toolbarBtnInflBrowser = await driver.findElement(By.id('alpheios-toolbar-navbuttons-inflectionsbrowser'))
    let toolbarBtnInflBrowserDisplayed = await toolbarBtnInflBrowser.isDisplayed()
    if (!toolbarBtnInflBrowserDisplayed) {
      const toolbarBtnShowNav = await driver.findElement(By.id('alpheios-toolbar-navbuttons-shownav'))
      await toolbarBtnShowNav.click()
    }

    await toolbarBtnInflBrowser.click()
    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()
    return checkText.every(text => panelText.includes(text))
  },

  async checkToolbarInflBrowserActionMobile (driver, checkText) {
    await this.checkAndClosePanelMobile(driver)

    await this.checkAndOpenActionPanel(driver)

    const toolbarBtnInflBrowser = await driver.wait(until.elementLocated(By.id('alpheios-action-panel-inflectionsbrowser')), timeoutG * 4)
    await toolbarBtnInflBrowser.click()


    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()
    await panel.click()
    return checkText.every(text => panelText.includes(text))
  },

  async checkToolbarGrammarAction (driver, checkText) {
    await this.checkAndClosePanel(driver)
    const toolbarBtnGrammar = await driver.findElement(By.id('alpheios-toolbar-navbuttons-grammar'))
    let toolbarBtnGrammarDisplayed = await toolbarBtnGrammar.isDisplayed()
    if (!toolbarBtnGrammarDisplayed) {
      const toolbarBtnShowNav = await driver.findElement(By.id('alpheios-toolbar-navbuttons-shownav'))
      await toolbarBtnShowNav.click()
    }

    await toolbarBtnGrammar.click()
    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()
    return checkText.every(text => panelText.includes(text))

  },

  async checkAndOpenActionPanel (driver) {
    const actionPanel = await driver.findElement(By.className('alpheios-action-panel'))
    const actionPanel_isDisplayed = await actionPanel.isDisplayed()

    if (!actionPanel_isDisplayed) {
      const toolbar =
        await driver.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4)
      await toolbar.click()
    }
  },
  
  async checkToolbarGrammarActionMobile (driver, checkText) {
    await this.checkAndClosePanelMobile(driver)

    await this.checkAndOpenActionPanel(driver)
    

    const toolbarBtnGrammar = await driver.wait(until.elementLocated(By.id('alpheios-action-panel-grammar')), timeoutG * 4)
    await toolbarBtnGrammar.click()

    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()
    await panel.click()
    return checkText.every(text => panelText.includes(text))
  },

  async checkToolbarUserAction (driver, checkText) {
    await this.checkAndClosePanel(driver)
    const toolbarBtnUser = await driver.findElement(By.id('alpheios-toolbar-navbuttons-user'))
    let toolbarBtnUserDisplayed = await toolbarBtnUser.isDisplayed()
    if (!toolbarBtnUserDisplayed) {
      const toolbarBtnShowNav = await driver.findElement(By.id('alpheios-toolbar-navbuttons-shownav'))
      await toolbarBtnShowNav.click()
    }

    await toolbarBtnUser.click()
    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()
    return checkText.every(text => panelText.includes(text))
  },

  async checkToolbarUserActionMobile (driver, checkText) {
    await this.checkAndClosePanelMobile(driver)

    await this.checkAndOpenActionPanel(driver)
    

    const toolbarBtnGrammar = await driver.wait(until.elementLocated(By.id('alpheios-action-panel-user')), timeoutG * 4)
    await toolbarBtnGrammar.click()

    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()
    await panel.click()
    return checkText.every(text => panelText.includes(text))
  },

  async checkToolbarOptionsAction (driver, checkText) {
    await this.checkAndClosePanel(driver)
    const toolbarBtnOptions = await driver.findElement(By.id('alpheios-toolbar-navbuttons-options'))
    let toolbarBtnOptionsDisplayed = await toolbarBtnOptions.isDisplayed()
    if (!toolbarBtnOptionsDisplayed) {
      const toolbarBtnShowNav = await driver.findElement(By.id('alpheios-toolbar-navbuttons-shownav'))
      await toolbarBtnShowNav.click()
    }

    await toolbarBtnOptions.click()
    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()

    return checkText.every(text => panelText.includes(text))
  },

  async checkToolbarOptionsActionMobile (driver, checkText) {
    await this.checkAndClosePanelMobile(driver)
    await this.checkAndOpenActionPanel(driver)
    
    const toolbarBtnGrammar = await driver.wait(until.elementLocated(By.id('alpheios-action-panel-options')), timeoutG * 4)
    await toolbarBtnGrammar.click()

    const panel =
      await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

    const panelText = await panel.getText()
    await panel.click()
    return checkText.every(text => panelText.includes(text))
  },

  async checkHasDisambiguated (driver) {
    const popup = await driver.wait(until.elementLocated(By.id('alpheios-popup-inner')), timeoutG * 4);
    const popupContent = await driver.wait(until.elementLocated(By.className('alpheios-popup__content')), timeoutG * 4);
    const popupDictentry = await driver.wait(until.elementLocated(By.className('alpheios-morph__dictentry')), timeoutG * 4);

    const disambiguatedIcon = await popupContent.findElement(By.css('.alpheios-disambiguated-icon'));
    const disambiguatedIconDisplayed = await disambiguatedIcon.isDisplayed()

    expect(disambiguatedIconDisplayed).toBeTruthy()

    const treebankdIcon = await popupContent.findElement(By.css('.alpheios-treebank-icon'));
    const treebankdIconDisplayed = await treebankdIcon.isDisplayed()

    expect(treebankdIconDisplayed).toBeTruthy()
  },


  async checkHasTreebankTab (driver) {
    const popup = await driver.wait(until.elementLocated(By.id('alpheios-popup-inner')), timeoutG * 4);
    const popupContent = await driver.wait(until.elementLocated(By.className('alpheios-popup__content')), timeoutG * 4);
    const popupDictentry = await driver.wait(until.elementLocated(By.className('alpheios-morph__dictentry')), timeoutG * 4);

    const treebankIcon = await driver.wait(until.elementLocated(By.id('alpheios-popup-toolbar-btn-treebank')), timeoutG * 4)

    const treebankIconDisplayed = await treebankIcon.isDisplayed()

    expect(treebankIconDisplayed).toBeTruthy()

    if (treebankIconDisplayed) {
      await treebankIcon.click()

      const panel =
        await driver.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)
      
      const treebankIframe = await driver.findElement(By.id('alpheios-treebank-frame'))
      const treebankIframeDisplayed = await treebankIframe.isDisplayed()

      expect(treebankIframeDisplayed).toBeTruthy()
    }
  },

  async openWordlistTab (driver) {
    await this.checkAndClosePopup(driver)
    await this.checkAndClosePanel(driver)

    const toolbar =
      await driver.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4)

    const wordlistIconToolbar = await toolbar.findElement(By.id('alpheios-toolbar-navbuttons-wordlist'))
    let wordlistIconToolbar_isDisplayed = await wordlistIconToolbar.isDisplayed()

    if (!wordlistIconToolbar_isDisplayed) {
      const shownavIconToolbar = await toolbar.findElement(By.id('alpheios-toolbar-navbuttons-shownav'))
      await shownavIconToolbar.click()
      wordlistIconToolbar_isDisplayed = await wordlistIconToolbar.isDisplayed()
    }

    await wordlistIconToolbar.click()
  },

  async checkWordlist (driver, words) {
    await this.openWordlistTab(driver)

    const wordlistTab = await driver.findElement(By.css('.alpheios-panel__tab-panel.alpheios-panel__tab__wordlist'))
    const wordlistTabItems = await wordlistTab.findElements(By.className('alpheios-wordlist-language__worditem'))

    expect(wordlistTabItems.length).toEqual(words.length)

    for (let i = 0; i < wordlistTabItems.length; i++) {
      const word = words[i]
      const wordItem = wordlistTabItems[i]

      const wordItem_targetWord = await wordItem.findElement(By.className('alpheios-worditem__targetWord'))
      const wordItem_targetWord_text = await wordItem_targetWord.getText()

      expect(wordItem_targetWord_text).toEqual(word.targetWord)

      const wordItem_lemmaList = await wordItem.findElement(By.className('alpheios-worditem__lemmasList'))
      const wordItem_lemmaList_text = await wordItem_lemmaList.getText()

      expect(wordItem_lemmaList_text).toEqual(word.lemmaList)

      const wordItem_frequency = await wordItem.findElement(By.className('alpheios-worditem__frequency'))
      const wordItem_frequency_text = await wordItem_frequency.getText()

      expect(wordItem_frequency_text).toEqual('1')

      const wordItem_updatedDT = await wordItem.findElement(By.className('alpheios-worditem__updatedDT'))
      const wordItem_updatedDT_text = await wordItem_updatedDT.getText()

      expect(wordItem_updatedDT_text).toEqual(this.today())

      console.info('checked', word)
    }
  }
}
