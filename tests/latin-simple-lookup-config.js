module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'chrome',
    browserVersions: ['78.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }, { 'os' : 'Windows', 'os_version' : '8.1' }]
  },
  lookupData: {
    targetWord: 'beatum',
    firstCheck: 'beatus , beata'/*,
    secondCheck: ['beatus beata beatum', 'blessed, blissful; "Saint" (in early Church, less formal);']*/
  }
}
