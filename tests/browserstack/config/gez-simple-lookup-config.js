module.exports = {
  testUrl: 'http://alpheios-test.irina-sklyarova.ru/demo/index-selenium.html',
  env: [{
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
    timeout: 12000
  },
  {
    browserName: "chrome",
    browserVersions: ["79.0"],
    osVersions: [{ "os" : "Windows", "os_version" : "10" }],
    timeout: 10000
  },
  {
    browserName: "safari",
    browserVersions: ["12.1"],
    timeout: 10000
  }],
  lookupData: {
    clickData: {
      word: 'ወጠይቅ',
    },
    checkData: {
      text: 'et ,  que ,  atque ,  et ,  quidem'
    }
  }
}
