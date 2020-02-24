module.exports = {
  testUrl: 'https://texts.alpheios.net',
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
 
