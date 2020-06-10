module.exports = {
  // testUrl: 'https://texts.alpheios.net',
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'firefox',
    // browserVersions: ['68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0'],
    browserVersions: ['75.0'],
    // "minBrowserVersion": "76",
    osVersions: [{ 'os' : 'Windows', 'os_version' : '8.1' }],
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'Catalina' }],
    timeout: 28000
  },
  lookupData: [
    {
      clickData: {
        word: 'beatum',
      },
      checkData: {
        text: ['happy, fortunate, bringing happiness rich', 'blessed, blissful; "Saint" (in early Church, less formal);'],
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
