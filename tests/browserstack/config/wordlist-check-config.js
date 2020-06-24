module.exports = {
  // testUrl: 'https://texts.alpheios.net',
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    desktop: {
      browserName: 'firefox',
      // browserVersions: ['68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0'],
      browserVersions: ['75.0'],
      // minBrowserVersion: "70",
      osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
      // osVersions: [{ 'os' : 'OS X', 'os_version' : 'Catalina' }],
      timeout: 28000,
      'browserstack.console': 'errors'
    }/*, 
    mobile: {
      device: ['iPhone 11 Pro Max', 'Samsung Galaxy S20 Plus' ],
      device_like: false,
      realMobile: true,
      'browserstack.console': 'errors'
    }*/
  },
  wordlistData: {
    words: [
      { targetWord: 'fero', lang: 'Latin', lemmaList: 'ferus, fero' },
      { targetWord: 'male', lang: 'Latin', lemmaList: 'malus, male' },
      { targetWord: 'beatum', lang: 'Latin', lemmaList: 'beatus, beo, beatum' },
      { targetWord: 'οἰστροδόνου', lang: 'Greek', lemmaList: 'οἰστρόδονος, οἰστροδόνος' },
      { targetWord: 'ἄνδρα', lang: 'Greek', lemmaList: 'ἀνήρ' }
    ]
  }
}
