module.exports = {
  // testUrl: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0893.phi002.perseus-lat2/passage/1-30',
  testUrl: 'http://alpheios-test.irina-sklyarova.ru/demo/index-selenium.html',
  env: {
    "browserName": "chrome",
    browserVersions: ["79.0"],
    "osVersions": [{ "os" : "Windows", "os_version" : "8.1" }],
    timeout: 10000
  },
  /*env: [
    {
      browserName: "chrome",
      browserVersions: ["79.0"],
      osVersions: [{ "os" : "Windows", "os_version" : "10" }],
      timeout: 10000
    },
    {
      browserName: 'firefox',
      browserVersions: ['72.0'],
      osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
    }
  ],*/
  lookupData: [
    {
      clickData: {
        path: '#latin-text-fero'
      },
      checkData: {
        targetWord: 'fero',
        text: 'ferus fera ferum'
      }
    },
    {
      clickData: {
        path: '#latin-text-cupidinibus'
      },
      checkData: {
        targetWord: 'cupidinibus',
        text: ['desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;', 'feminine masculine']
      }
    }
  ]
}
