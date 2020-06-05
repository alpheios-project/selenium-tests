module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'safari',
    browserVersions: ['11.1'],
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'High Sierra' }]
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'High Sierra' }]
  },
  timeout: 68000,
  lookupData: {
    clickData: {
      word: 'ܕܘܟܬܐ',
    },
    checkData: {
      text: ['place', 'state emphatic', 'J. Payne Smith (Mrs. Margoliouth)']
    }
  }
}
