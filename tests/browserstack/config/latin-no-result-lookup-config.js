module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
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
  