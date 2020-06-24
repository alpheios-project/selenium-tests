module.exports = {
    // testUrl: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0893.phi002.perseus-lat2/passage/1-30',
    testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
    env: {
      desktop: {
        browserName: 'firefox',
        // browserVersions: ['68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0'],
        browserVersions: ['75.0'],
        // "minBrowserVersion": "76",
        osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
        // osVersions: [{ 'os' : 'OS X', 'os_version' : 'Catalina' }],
        timeout: 28000,
        'browserstack.console': 'errors'
      }      
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
  