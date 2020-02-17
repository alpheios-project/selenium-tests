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

module.exports = {
  async defineDriver (capabilities, creds) {
    let capabilitiesCurrent = Object.assign(basicCapabilities, capabilities)
    capabilitiesCurrent = Object.assign(capabilitiesCurrent, creds)
    driver = new Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilitiesCurrent)
      .build()
    driver.manage().window().maximize()
    return driver
  },

  async goToUrl (driver, url) {
    await driver.get(url)
  },

  async checkAlpehiosLoaded (driver) {
    const toolbar = await driver.findElement(By.id('alpheios-toolbar-inner'))
    return toolbar
  },

  async lookupLatinWord (driver, targetWord) {
    const toolbar = await driver.findElement(By.id('alpheios-toolbar-inner'))
  
    const lookupIconToolbar = await toolbar.findElement(By.className('alpheios-toolbar__lookup-control'))
    await lookupIconToolbar.click()

    const lookupFormToolbar = await toolbar.findElement(By.css('.alpheios-lookup__form'))

    const lookupInputToolbar = await lookupFormToolbar.findElement(By.tagName('input'))
    await lookupInputToolbar.click()
    await lookupInputToolbar.sendKeys(targetWord)
    
    const lookupFormButtonToolbar = await lookupFormToolbar.findElement(By.tagName('button'))
    await lookupFormButtonToolbar.click()
  },

  async checkLexemeData (driver, num, checkText) {
    const popup = await driver.findElement(By.id('alpheios-popup-inner'))
    const morphPopup = await popup.findElement(By.id('alpheios-lexical-data-container'))
    const lexemeDataMorph = await morphPopup.findElement(By.css(`#alpheios-morph-component > div:nth-child(${num}) .alpheios-morph__dictentry`))  
    let lexemeDataMorph_text = await lexemeDataMorph.getText()
    lexemeDataMorph_text = lexemeDataMorph_text.replace(/[^\x20-\x7E]+/g, ' ').replace(/\s{2,}/g, ' ').trim()

    if (!Array.isArray(checkText)) { checkText = [checkText] }

    checkText.forEach(text => {
      let finalCheck = false

      finalCheck = lexemeDataMorph_text.includes(text)
      if (!finalCheck) {
        text = text.replace(',', ' ').replace(/\s{2,}/g, ' ').trim()
        lexemeDataMorph_text = lexemeDataMorph_text.replace(',', ' ').replace(/\s{2,}/g, ' ').trim()
        finalCheck = lexemeDataMorph_text.includes(text)
      }

      expect(finalCheck).toBeTruthy()
    })
  },

  async checkHasInflectionsTab (driver) {
    const popup = await driver.findElement(By.id('alpheios-popup-inner'))
    const popupToolbarInflButton = await popup.findElement(By.css('.alpheios-popup__toolbar-buttons > div:nth-child(2)'))  
    await popupToolbarInflButton.click()
      
    const panel = await driver.findElement(By.id('alpheios-panel__inflections-panel'))
    const panelTitle = await panel.findElement(By.css('h1.alpheios-panel__title'))
  
    let panelTitle_text = await panelTitle.getText()
    panelTitle_text = panelTitle_text.replace(/[^\x20-\x7E]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
    expect(panelTitle_text.toLowerCase()).toEqual('inflection tables')
  }
}
