module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: {
    browserName: 'Firefox',
    browserVersions: ['71.0']/*,
    osVersions: [{ 'os' : 'Windows', 'osVersion' : '10' }, { 'os' : 'Windows', 'osVersion' : '8.1' }]*/
  },
  creds: {
    'browserstack.user' : 'bsuser62225',
    'browserstack.key' : 'qbS59xyzU6RxuYjEMbJn'
  },
  lookupData: {
    targetWord: 'male',
    firstCheck: 'mala',
    secondCheck: ['malus mali', 'mast; beam; tall pole, upright pole; standard, prop, staff;']
  }
}
