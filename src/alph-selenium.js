const {webdriver, Builder, By, Key, Until} = require('selenium-webdriver')
require('./fast-selenium.js')

const basicCapabilities = {
  'browserName' : 'Chrome',
  'browser_version' : '79.0',
  'os' : 'Windows',
  'os_version' : '10',
  'resolution' : '1024x768',
  'name' : 'Alpeious Test',
  'acceptSslCerts' : 'true',
  'browserstack.debug' : 'true'
}

let timeoutG = require('./main-config.json').timeout

module.exports = {
  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
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

    timeoutG = timeout
    return driver
  },

  async goToUrl (driver, url) {
    await driver.get(url)
  },

  async checkAlpehiosLoaded (driver) {
    const toolbar = await driver.findElement(By.id('alpheios-toolbar-inner'))
    return toolbar
  },

  async firstPageLoad (driver, url) {
    await this.timeout(timeoutG)

    this.goToUrl(driver, url)
    await this.timeout(timeoutG)

    let loaded = true
    try {
      await this.checkAlpehiosLoaded(driver)
    } catch (err) {
      loaded = false
      await driver.quit()
    }
    return loaded
  },

  async activateLookup (driver) {
    const toolbar = await driver.findElement(By.id('alpheios-toolbar-inner'))
  
    const lookupIconToolbar = await toolbar.findElement(By.className('alpheios-toolbar__lookup-control'))
    await lookupIconToolbar.click()

    const lookupFormToolbar = await toolbar.findElement(By.css('.alpheios-lookup__form'))

    const lookupInputToolbar = await lookupFormToolbar.findElement(By.tagName('input'))

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
    langChangeLink.click()

    const langChangeSelect = await form.findElement(By.className('alpheios-select alpheios-setting__control'))
    const result = await this.changeSelectedOption(driver, langChangeSelect, lang)
    return result
  },

  async changeSelectedOption (driver, selectElement, optionValue) {
    let testText = await selectElement.getText()
    await selectElement.click()
    await this.timeout(timeoutG)

    const options = await selectElement.findElements(By.tagName('option'))
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
      console.info('desiredOption text - ', testText)
      await desiredOption.click()
      return true
    }

    return false
  },

  async lookupWord (driver, targetWord, lang) {
    const lookupBlock = await this.activateLookup(driver)

    let resLangCheck = await this.checkLanguageInLookup(driver, lookupBlock.form, lang)
    let resChangeLang = true
    if (!resLangCheck) {
      resChangeLang = await this.changeLookupLanguage(driver, lookupBlock.form, lang)
    }

    expect(resChangeLang).toBeTruthy()

    if (resChangeLang) {
      await this.timeout(timeoutG)

      await lookupBlock.input.click()
      await lookupBlock.input.sendKeys(targetWord)
      
      const lookupFormButtonToolbar = await lookupBlock.form.findElement(By.tagName('button'))
      await lookupFormButtonToolbar.click()
    }
  },

  async checkLexemeData (driver, num, checkText) {
    const popup = await driver.findElement(By.id('alpheios-popup-inner'))
    const morphPopup = await popup.findElement(By.id('alpheios-lexical-data-container'))
    const popupContent = await popup.findElement(By.className('alpheios-popup__content'))
    let sourcePopupText = await popupContent.getText()
    sourcePopupText = sourcePopupText.replace(/[^\x20-\x7E]+/g, ' ').replace(/\s{2,}/g, ' ').trim()

    console.info('sourcePopupText', sourcePopupText)

    console.info('checkText', checkText)

    if (!Array.isArray(checkText)) { checkText = [checkText] }

    checkText.forEach(text => {
      let finalLexemeCheck = false

      finalLexemeCheck = sourcePopupText.includes(text)
      if (!finalLexemeCheck) {
        text = text.replace(',', ' ').replace(/\s{2,}/g, ' ').trim()
        sourcePopupText = sourcePopupText.replace(',', ' ').replace(/\s{2,}/g, ' ').trim()
        finalLexemeCheck = sourcePopupText.includes(text)
      }

      expect(finalLexemeCheck).toBeTruthy()
    })
  },

  async checkHasInflectionsTab (driver) {
    const popup = await driver.findElement(By.id('alpheios-popup-inner'))
   
    let loadedInflButton = true
    try {
      const popupToolbarInflButton = await popup.findElement(By.css('.alpheios-popup__toolbar-buttons > div:nth-child(2)'))
      await popupToolbarInflButton.click()
    } catch (err) {
      loadedInflButton = false
      await driver.quit()
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
