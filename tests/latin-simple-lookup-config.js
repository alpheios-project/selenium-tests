module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'firefox',
    // browserVersions: ['78.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }, { 'os' : 'Windows', 'os_version' : '8.1' }]
  },
  creds: {
    'browserstack.user' : 'bsuser62225',
    'browserstack.key' : 'azupMxLR1XptWppiEpeD'
  },
  lookupData: {
    targetWord: 'beatum',
    firstCheck: 'beatus , beata'/*,
    secondCheck: ['beatus beata beatum', 'blessed, blissful; "Saint" (in early Church, less formal);']*/
  }
}
