module.exports = {
  testUrl: 'http://alpheios-test.irina-sklyarova.ru/demo/index-selenium.html',
  env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
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
