describe('main-async.test.js', () => {
  const {webdriver, Builder, By, Key, Until} = require('selenium-webdriver')

  let driverChrome

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  beforeEach(() => {
    driverChrome = new Builder()
      .forBrowser('chrome')
      .build()
    driverChrome.manage().window().maximize()
  })

  afterEach(() => {
    driverChrome.quit()
  })

  it('should execute male (latin) lookup', async () => {
    await driverChrome.get('https://texts.alpheios.net')

    const toolbar = await driverChrome.findElement(By.id('alpheios-toolbar-inner'))

    const lookupIconToolbar = await toolbar.findElement(By.className('alpheios-toolbar__lookup-control'))
    await lookupIconToolbar.click()

    const lookupFormToolbar = await toolbar.findElement(By.css('.alpheios-lookup__form'))

    const lookupInputToolbar = await lookupFormToolbar.findElement(By.tagName('input'))
    await lookupInputToolbar.click()
    await lookupInputToolbar.sendKeys('male')
    
    const lookupFormButtonToolbar = await lookupFormToolbar.findElement(By.tagName('button'))
    await lookupFormButtonToolbar.click()

    await timeout(6000)

    const popup = await driverChrome.findElement(By.id('alpheios-popup-inner'))

    const morphPopup = await popup.findElement(By.id('alpheios-lexical-data-container'))

    const secondPrincipalPartMorph = await morphPopup.findElement(By.css('#alpheios-morph-component .alpheios-principal-parts__listitem:nth-child(2)'))
    const secondPrincipalPartMorph_text = await secondPrincipalPartMorph.getText()
    expect(secondPrincipalPartMorph_text).toEqual('mala')

    const secondLexPrincipalPartMorph = await morphPopup.findElement(By.css('#alpheios-morph-component > div:nth-child(2) .alpheios-morph__dictentry'))  
    const secondLexPrincipalPartMorph_text = await secondLexPrincipalPartMorph.getText()

    expect(secondLexPrincipalPartMorph_text.includes('malus mali')).toBeTruthy()
    expect(secondLexPrincipalPartMorph_text.includes('mast; beam; tall pole, upright pole; standard, prop, staff;')).toBeTruthy()

    const popupToolbarInflButton = await popup.findElement(By.css('.alpheios-popup__toolbar-buttons > div:nth-child(2)'))  
    await popupToolbarInflButton.click()
    
    const panel = await driverChrome.findElement(By.id('alpheios-panel__inflections-panel'))
    const panelTitle = await panel.findElement(By.css('h1.alpheios-panel__title'))

    const panelTitle_text = await panelTitle.getText()
    expect(panelTitle_text).toEqual('Inflection Tables')
    
  }, 500000)
})
