module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: [
   {
       browserName: 'chrome',
       minBrowserVersion: '75',
       osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
     },/*
    {
      browserName: 'safari'
    }*/
  ],
  lookupData: {
    targetWord: 'اَلدٌّنيَا',
    firstCheck: 'world',
    secondCheck: ['adjective', 'near/low']
  }
}
