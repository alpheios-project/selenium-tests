describe('simple-latin-lookup.test.js', () => {
    const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')
  
    let driverChrome
    const timeoutG = 3000

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
      // driverChrome.quit()
    })
  
    it('should execute male (latin) lookup', async () => {
      await driverChrome.get('http://localhost:8888/demo/index.html')
      
      // Open Lookup form in toolbar
      const toolbar =
            await driverChrome.wait(until.elementLocated(By.id('alpheios-toolbar-inner')), timeoutG * 4)
      
      const lookupIconToolbar = await toolbar.findElement(By.id('alpheios-toolbar-navbuttons-lookup'))
      await lookupIconToolbar.click()

      // Print Latin word male
      const lookupFormToolbar = await toolbar.findElement(By.id('alpheios-lookup-form'))
      const lookupInputToolbar = await lookupFormToolbar.findElement(By.id('alpheios-lookup-form-input'))

      await lookupInputToolbar.click()

      await lookupInputToolbar.sendKeys('male')

      const lookupFormButtonToolbar = await lookupFormToolbar.findElement(By.id('alpheios-lookup-form-button'))
      await lookupFormButtonToolbar.click()

      // Check that popup appeared
      const popup =
            await driverChrome.wait(until.elementLocated(By.id('alpheios-popup-inner')), timeoutG * 4)
      
      const morphPopup = await driverChrome.wait(until.elementLocated(By.id('alpheios-lexical-data-container')), timeoutG * 4)

      // Check that second principal part has mala text

      const secondPrincipalPartMorph = await driverChrome.wait(until.elementLocated(By.css('#alpheios-morph-component .alpheios-principal-parts__listitem:nth-child(2)')), timeoutG * 4)
      const secondPrincipalPartMorph_text = await secondPrincipalPartMorph.getText()
      expect(secondPrincipalPartMorph_text).toEqual('mala')

      // Check that popup has inflections icon

      const inflectionPopupIcon = await driverChrome.wait(until.elementLocated(By.css('#alpheios-popup-header #alpheios-popup-toolbar-btn-inflections')), timeoutG * 4)
      const inflectionPopupIconDisplayed = await inflectionPopupIcon.isDisplayed()
      expect(inflectionPopupIconDisplayed).toBeTruthy()

      // Check that popup has wordusage icon

      const wordusagePopupIcon = await driverChrome.wait(until.elementLocated(By.css('#alpheios-popup-header #alpheios-popup-toolbar-btn-wordusage')), timeoutG * 4)
      const wordusagePopupIconDisplayed = await wordusagePopupIcon.isDisplayed()
      expect(wordusagePopupIconDisplayed).toBeTruthy()

      // Check that popup has definitions icon

      await timeout(timeoutG * 4)

      const definitionPopupIcon = await driverChrome.wait(until.elementLocated(By.css('#alpheios-popup-header #alpheios-popup-toolbar-btn-definitions')), timeoutG * 4)
      const definitionPopupIconDisplayed = await definitionPopupIcon.isDisplayed()
      expect(definitionPopupIconDisplayed).toBeTruthy()


      // Open Wordusage tab via popup icon

      await wordusagePopupIcon.click()

      let panel =
            await driverChrome.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

      const panelWordUsageTab = await panel.findElement(By.css('#alpheios-panel-inner .alpheios-word-usage'))

      // Check if Wordusage tab has male in title

      const panelWordUsageTitle = await panelWordUsageTab.findElement(By.css('.alpheios_word_usage_list_title'))
      const panelWordUsageTitle_text = await panelWordUsageTitle.getText()
      expect(panelWordUsageTitle_text.indexOf('male')).toEqual(0)

      await timeout(timeoutG * 4)

      // Check if Wordusage tab has word usage examples

      const panelWordUsageTabItems = await panelWordUsageTab.findElements(By.css('.alpheios-word-usage__examples-source-link-large'))
      expect(panelWordUsageTabItems.length).toBeGreaterThan(0)

      // Close panel and open Inflections tab via popup

      let panelCloseButton = await panel.findElement(By.id('alpheios-panel-close-btn'))
      await panelCloseButton.click()

      await inflectionPopupIcon.click()
      panel =
            await driverChrome.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

      const panelInflectionsTab = await panel.findElement(By.id('alpheios-panel__inflections-panel'))

      // Check if Inflections tab has targetWord - male

      const panelInflectionsTabTarget = await panelInflectionsTab.findElement(By.css('.alpheios-inflections__forms-targetword'))
      const panelInflectionsTabTarget_text = await panelInflectionsTabTarget.getText()
      expect(panelInflectionsTabTarget_text.indexOf('"male"')).toEqual(0)

      // Check if Inflections tab has the list of available part of speech inside select - noun, adjective

      const panelInflectionsTabSelect = await panelInflectionsTab.findElement(By.css('.alpheios-inflections__view-selector'))
      const panelInflectionsTabSelectOptions = await panelInflectionsTabSelect.findElements(By.tagName('option'))
      expect(panelInflectionsTabSelectOptions.length).toEqual(2)

      let panelInflectionsTabSelectOptions_text = await panelInflectionsTabSelectOptions[0].getText()
      expect(panelInflectionsTabSelectOptions_text).toEqual('noun')

      panelInflectionsTabSelectOptions_text = await panelInflectionsTabSelectOptions[1].getText()
      expect(panelInflectionsTabSelectOptions_text).toEqual('adjective')

      // Check if current active inflection table has title Noun declension
      const panelInflectionsTabTitle = await panelInflectionsTab.findElement(By.css('.alpheios-inflections__title'))
      const panelInflectionsTabTitle_text = await panelInflectionsTabTitle.getText()
      expect(panelInflectionsTabTitle_text.indexOf('Noun declension')).toEqual(0)

       // Close panel and open Definitions tab via popup

      panelCloseButton = await panel.findElement(By.id('alpheios-panel-close-btn'))
      await panelCloseButton.click()

      await definitionPopupIcon.click()

      panel =
            await driverChrome.wait(until.elementLocated(By.id('alpheios-panel-inner')), timeoutG * 4)

      const panelDefinitionsTab = await panel.findElement(By.className('alpheios-panel__tab__definitions'))

      // Check if Inflections tab has 5 definitions blocks - 4 are short definitions and 1 is for full

      const panelDefinitionsTabShortDefsItems = await panelDefinitionsTab.findElements(By.className('alpheios-panel__contentitem'))
      expect(panelDefinitionsTabShortDefsItems.length).toEqual(5)

      let panelDefinitionsTabShortDefsItems_text = await panelDefinitionsTabShortDefsItems[0].getText()
      expect(panelDefinitionsTabShortDefsItems_text).toEqual(expect.stringContaining('bad, evil, wicked; ugly; unlucky;'))

      panelDefinitionsTabShortDefsItems_text = await panelDefinitionsTabShortDefsItems[1].getText()
      expect(panelDefinitionsTabShortDefsItems_text).toEqual(expect.stringContaining('mast; beam; tall pole, upright pole; standard, prop, staff;'))

      panelDefinitionsTabShortDefsItems_text = await panelDefinitionsTabShortDefsItems[2].getText()
      expect(panelDefinitionsTabShortDefsItems_text).toEqual(expect.stringContaining('apple tree;'))

      panelDefinitionsTabShortDefsItems_text = await panelDefinitionsTabShortDefsItems[3].getText()
      expect(panelDefinitionsTabShortDefsItems_text).toEqual(expect.stringContaining('badly, ill, wrongly, wickedly, unfortunately; extremely;'))

      const panelDefinitionsTabFullDefsItems = await panelDefinitionsTab.findElements(By.className('alpheios-panel__contentitem-full-definitions'))
      expect(panelDefinitionsTabFullDefsItems.length).toEqual(1)

      const panelDefinitionsTabFullDefsItems_text = await panelDefinitionsTabFullDefsItems[0].getText()
      expect(panelDefinitionsTabFullDefsItems_text).toEqual(expect.stringContaining('mălus , a, um, adj.Sanscr. mala, dirt; Gr. μέλας, black; cf. macula; Germ. mal in Mutter-mal, etc..'))      
    }, 500000)
  })
  