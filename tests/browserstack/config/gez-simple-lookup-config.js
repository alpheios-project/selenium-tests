module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'safari',
    browserVersions: ['11.1'],
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '8.1' }],
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
