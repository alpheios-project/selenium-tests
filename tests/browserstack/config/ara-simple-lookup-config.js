module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'firefox',
    // browserVersions: ['68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0'],
    browserVersions: ['75.0'],
    // "minBrowserVersion": "76",
    osVersions: [{ 'os' : 'Windows', 'os_version' : '8.1' }],
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'Catalina' }],
  },
  lookupData: {
    clickData: {
      word: 'مَقَرٍ',
    },
    checkData: {
      text: ['noun', 'center/headquarters/residence']
    }
  }
}
