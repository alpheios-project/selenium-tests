module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'chrome',
    browserVersions: ['81.0'],
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'High Sierra' }]
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
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
