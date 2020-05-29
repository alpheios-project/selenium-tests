module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
    timeout: 28000
  },
  lookupData: {
    clickData: {
      word: 'ወጠይቅ',
    },
    checkData: {
      text: 'et ,  que ,  atque ,  et ,  quidem'
    }
  }
}
