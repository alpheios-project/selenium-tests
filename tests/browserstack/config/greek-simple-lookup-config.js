module.exports = {
  // testUrl: 'https://texts.alpheios.net',
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'safari',
    // browserVersions: ['65.0'],
    osVersions: [{ 'os' : 'OS X', 'os_version' : 'High Sierra' }]
  },
  timeout: 12000,
  lookupData: {
    clickData: {
      word: 'ἀγαθός',
    },
    checkData: {
      text: 'adjective 1st 2nd declension'
    }
  }
}
 
