module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'chrome',
    minBrowserVersion: '78',
    // browserVersions: ['78.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }, { 'os' : 'Windows', 'os_version' : '8.1' }]
  },
  creds: {
    'browserstack.user' : 'bsuser62225',
    'browserstack.key' : 'azupMxLR1XptWppiEpeD'
  },
  lookupData: {
    targetWord: 'ἀγαθός',
    firstCheck: 'adjective 1st 2nd declension'/*,
    secondCheck: ['beatus beata beatum', 'blessed, blissful; "Saint" (in early Church, less formal);']*/
  }
}
