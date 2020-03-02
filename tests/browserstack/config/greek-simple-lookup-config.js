module.exports = {
  // testUrl: 'https://texts.alpheios.net',
  testUrl: 'http://alpheios-test.irina-sklyarova.ru/demo/index-selenium.html',
  env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
  },
  lookupData: {
    clickData: {
      word: 'ἀγαθός',
    },
    checkData: {
      text: 'adjective 1st 2nd declension'
    }
  }
}
 
