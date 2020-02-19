const alph = require('./alph-selenium')
const config = require('./main-config.json')

module.exports = {
  async simpleLookupTest (version, url, lookupData, lang) {
    const driver = await alph.defineDriver(version, config.auth)
    const loaded = await alph.firstPageLoad(driver, url)

    expect(loaded).toBeTruthy()
    if (loaded && lookupData) {
      await alph.lookupWord(driver, lookupData.targetWord, lang)
      await alph.timeout(6000)
      
      if (lookupData.firstCheck) {
        await alph.checkLexemeData(driver, 1, lookupData.firstCheck)
      }
      if (lookupData.secondCheck) {
        await alph.checkLexemeData(driver, 2, lookupData.secondCheck)
      }

      await alph.checkHasInflectionsTab(driver)

      await driver.quit()
    }
  }

}