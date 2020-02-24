module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
    timeout: 12000
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
