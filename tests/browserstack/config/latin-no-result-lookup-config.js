module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'safari',
    //browserVersions: ['72.0'],
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'High Sierra' }]
  },
  lookupData: {
    clickData: {
      word: 'trrcchx',
    },
    checkData: {
      text: 'Lexical query produced no results'
    }
  }
}
  