module.exports = {
  // testUrl: 'https://texts.alpheios.net',
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'firefox',
    // browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
    timeout: 14000
  },
  lookupData: [
    {
      clickData: {
        word: 'beatum',
      },
      checkData: {
        text: ['beatus , beata', 'beatus beata beatum', 'blessed, blissful; "Saint" (in early Church, less formal);'],
        checkInflections: false
      }
    },
    {
      clickData: {
        word: 'male',
      },
      checkData: {
        text: ['apple tree', 'femininenoun; 2nd declension']
      }
    }
  ]
}
