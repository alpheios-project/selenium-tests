module.exports = {
  testUrl: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0893.phi002.perseus-lat2/passage/1-30',
  env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
    // osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }, { 'os' : 'Windows', 'os_version' : '8.1' }]
  },
  lookupData: {
    clickClass: 'l-text',
    firstCheck: 'Diana'
  }
}
