const alph = require('./alph-selenium')

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  async simpleLatinLookupTest (version, url) {
    const driverChrome = await alph.defineDriver(version)
    await timeout(6000)

    alph.goToUrl(driverChrome, url) //'https://texts.alpheios.net')
    await timeout(6000)

    let loaded = true
    try {
      await alph.checkAlpehiosLoaded(driverChrome)
    } catch (err) {
      loaded = false
      await driverChrome.quit()
    }

    expect(loaded).toBeTruthy()
    if (loaded) {
      await alph.lookupLatinWord(driverChrome, 'male')
      await timeout(6000)
        
      await alph.checkLexemeData(driverChrome, 1, 'mala')
      await alph.checkLexemeData(driverChrome, 2, ['malus mali', 'mast; beam; tall pole, upright pole; standard, prop, staff;'])
        
      await timeout(6000)
      await alph.checkHasInflectionsTab(driverChrome)

      await driverChrome.quit()
    }
  }
}