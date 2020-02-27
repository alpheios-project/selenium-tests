const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')
require('./fast-selenium.js')

const basicCapabilities = {
  'browserName' : 'Chrome',
  'browser_version' : '79.0',
  'os' : 'Windows',
  'os_version' : '10',
  'resolution' : '1280x1024',
  'name' : 'Alpeious Test',
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

  async takeTestScreenshot (driver, prev = '') {
    const fs = require('fs')
    const img = await driver.takeScreenshot()
    const newDate = new Date()

    const imgFileName = `tests/browserstack/screens/${prev}-screenshot-${this.currentDate()}.png`
    fs.writeFile(imgFileName, img, 'base64', (err) => { 
      if (err) { console.error(err) } else { console.info('Finished') }
    })
  },

  async defineDriver (capabilities, creds, timeout) {

    let capabilitiesCurrent = Object.assign(basicCapabilities, capabilities)
    capabilitiesCurrent = Object.assign(capabilitiesCurrent, {
      'browserstack.user': creds.username,
      'browserstack.key': creds.password
    })
    driver = new Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilitiesCurrent)
      .build()
    driver.manage().window().maximize()

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
       await driver.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4, 'Toolbar was not found');
    return toolbar
  },

  async firstPageLoad (driver, url) {
    this.goToUrl(driver, url)
    let loaded = true
    try {
      await this.checkAlpehiosLoaded(driver)
    } catch (err) {
      loaded = false
      const sessionData = await driver.getSession()
      if (sessionData) {
        await driver.quit()
      }
    }
    return loaded
  },

  async activateLookup (driver) {
    const toolbar =
      await driver.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4)

    const lookupIconToolbar = await toolbar.findElement(By.className('alpheios-toolbar__lookup-control'))
    await lookupIconToolbar.click()

    const lookupFormToolbar =  await driver.wait(until.elementLocated(By.className('alpheios-lookup__form')), timeoutG * 2);
    
    const lookupInputToolbar = await lookupFormToolbar.findElement(By.tagName('input'))

    return { form: lookupFormToolbar, input: lookupInputToolbar }
  },

  async checkAndClosePanel (driver) {
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
      const popupHeader = await popup.findElement(By.className('alpheios-popup__header'))
      const popupCloseButton = await popupHeader.findElement(By.className('alpheios-popup__close-btn'))

      await popupCloseButton.click()
      await driver.wait(until.elementIsNotVisible(popup), timeoutG * 2)
    }
  },
  

  async getLookupBlock (driver) {
    const toolbar = await driver.findElement(By.id('alpheios-toolbar-inner'))
    const lookupFormToolbar = await toolbar.findElement(By.css('.alpheios-lookup__form'))
    const lookupInputToolbar = await lookupFormToolbar.findElement(By.tagName('input'))

    let checkDisplayed = await lookupInputToolbar.isDisplayed()
    if (!checkDisplayed) {
      await this.checkAndClosePanel(driver)
    }
    checkDisplayed = await lookupInputToolbar.isDisplayed()
    return { form: lookupFormToolbar, input: lookupInputToolbar }
  },

  async checkLanguageInLookup (driver, form, lang) {
    const langHint = await form.findElement(By.className('alpheios-lookup__lang-hint'))
    let langHint_text = await langHint.getText()
    langHint_text = langHint_text.replace('(', '').replace(')', '')
    return langHint_text === lang
  },

  async changeLookupLanguage (driver, form, lang) {
    const langChangeLink = await form.findElement(By.className('alpheios-lookup__lang-change'))

    if (langChangeLink.isDisplayed()) {
      langChangeLink.click()
      const langChangeSelect = await form.findElement(By.className('alpheios-select alpheios-setting__control'))
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

  async lookupWord (driver, clickData, lang, needActivation = true) {
    let resChangeLang = true
    let lookupBlock

    if (needActivation) {
      lookupBlock = await this.activateLookup(driver)

      let resLangCheck = await this.checkLanguageInLookup(driver, lookupBlock.form, lang)  
      if (!resLangCheck) {
        resChangeLang = await this.changeLookupLanguage(driver, lookupBlock.form, lang)
      }

      expect(resChangeLang).toBeTruthy()
    } else {
      lookupBlock = await this.getLookupBlock(driver)
    }

    if (resChangeLang) {
      await lookupBlock.input.click()
      await lookupBlock.input.sendKeys(clickData.word)
      
      const lookupFormButtonToolbar = await lookupBlock.form.findElement(By.css('button'))
      await lookupFormButtonToolbar.click()
    }
  },

  async dblclickLookupWord (driver, clickData, lang) {
    await this.checkAndClosePopup(driver)
    await this.checkAndClosePanel(driver)

    const textPartForLookup = await driver.findElements(By.css(clickData.path))

    const num = clickData.num ? clickData.num - 1 : 0
    if (textPartForLookup && textPartForLookup[num]) {
      await textPartForLookup[num].click()
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
    let sourcePopupText = await popupContent.getText()
    sourcePopupText = sourcePopupText.replace(/\s{2,}/g, ' ').trim()

    const popupSelection = await driver.wait(until.elementLocated(By.className('alpheios-popup__toolbar-text')), timeoutG * 4);
    let popupSelection_text = await popupSelection.getText()
    popupSelection_text = popupSelection_text.replace(' ', '').trim()

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
    
      let panelTitle_text = await panelTitle.getText()
      panelTitle_text = panelTitle_text.replace(/[^\x20-\x7E]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
      expect(panelTitle_text.toLowerCase()).toEqual('inflection tables')
    }
  }
}
