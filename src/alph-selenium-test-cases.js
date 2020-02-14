const alph = require('./alph-selenium')

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  async simpleLatinLookupTest (version, url, creds, lookupData) {
    const driverChrome = await alph.defineDriver(version, creds)
    await timeout(6000)

    alph.goToUrl(driverChrome, url)
    await timeout(6000)

    let loaded = true
    try {
      await alph.checkAlpehiosLoaded(driverChrome)
    } catch (err) {
      loaded = false
      await driverChrome.quit()
    }

    expect(loaded).toBeTruthy()
    if (loaded && lookupData) {
      await alph.lookupLatinWord(driverChrome, lookupData.targetWord)
      await timeout(6000)
      
      if (lookupData.firstCheck) {
        await alph.checkLexemeData(driverChrome, 1, lookupData.firstCheck)
      }
      if (lookupData.firstCheck) {
        await alph.checkLexemeData(driverChrome, 2, lookupData.secondCheck)
      }

      await alph.checkHasInflectionsTab(driverChrome)

      await driverChrome.quit()
    }
  }
}