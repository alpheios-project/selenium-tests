module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'chrome',
    minBrowserVersion: '78',
    // browserVersions: ['78.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }, { 'os' : 'Windows', 'os_version' : '8.1' }]
  },
  lookupData: {
    targetWord: 'اَلدٌّنيَا',
    firstCheck: 'world',
    secondCheck: ['adjective', 'near/low']
  }
}
