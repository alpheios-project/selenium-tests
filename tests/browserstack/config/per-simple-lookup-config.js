module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'safari',
    browserVersions: ['11.1'],
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'High Sierra' }]
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '8.1' }]
  },
  timeout: 68000,
  lookupData: {
    clickData: {
      word: 'جان',
    },
    checkData: {
      text: ['Soul, vital spirit, mind', 'The father of the jinn']
    }
  }
}
