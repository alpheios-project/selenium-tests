module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'Chrome',
    browserVersions: ['78.0'],
    osVersions: [{ 'os' : 'Windows', 'osVersion' : '10' }]
    /*,
    osVersions: [{ 'os' : 'Windows', 'osVersion' : '10' }, { 'os' : 'Windows', 'osVersion' : '8.1' }]*/
  },
  creds: {
    'browserstack.user' : 'bsuser62225',
    'browserstack.key' : 'qbS59xyzU6RxuYjEMbJn'
  },
  lookupData: {
    targetWord: 'beatum',
    firstCheck: 'beatus , beata'/*,
    secondCheck: ['beatus beata beatum', 'blessed, blissful; "Saint" (in early Church, less formal);']*/
  }
}
