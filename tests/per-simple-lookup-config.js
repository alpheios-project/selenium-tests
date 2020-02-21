module.exports = {
  testUrl: 'https://texts.alpheios.net',
  env: [
    {
      "browserName": "chrome",
      "browserVersions": [ "76.0" ],
      // "osVersions": [{ "os" : "Windows", "os_version" : "10" }, { "os" : "Windows", "os_version" : "8.1" }]
      "osVersions": [{ "os" : "Windows", "os_version" : "10" }]
    }
  ],
  lookupData: {
    targetWord: 'جان',
    firstCheck: ['Soul, vital spirit, mind', 'The father of the jinn']
  }
}
