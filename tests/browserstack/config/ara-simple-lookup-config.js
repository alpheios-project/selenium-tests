module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'safari',
    // browserVersions: ['72.0'],
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '8.1' }]
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
