module.exports = {
    // testUrl: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0893.phi002.perseus-lat2/passage/1-30',
    testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
    env: {
      browserName: 'firefox',
      // browserVersions: ['76.0'],
      // osVersions: [{ 'os' : 'OS X', 'os_version' : 'Catalina' }],
      osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
      'browserstack.console': 'errors'
    },
    lookupData: [
      {
        clickData: {
          path: '#lat-tb-word'
        },
        checkData: {
          targetWord: 'primaque',
          text: 'first, foremost/best, chief, principal;'
        }
      }
      
    ]
  }
  