module.exports = {
  testUrl: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0893.phi002.perseus-lat2/passage/1-30',
  /*env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
  },*/
  env: [
    {
      browserName: "chrome",
      browserVersions: ["78.0"],
      osVersions: [{ "os" : "Windows", "os_version" : "10" }]
    }
  ],
  lookupData: [
    {
      clickData: {
        class: 'l-text',
        num: 1,
        x: -100, y: 5
      },
      checkData: {
        targetWord: 'Phoebe',
        text: 'Diana'
      }
    }/*,
    {
      clickData: {
        class: 'l-text',
        num: 7,
        x: -20, y: 5
      },
      checkData: {
        targetWord: 'septem',
        text: 'numeral'
      }
    },
    {
      clickData: {
        class: 'l-text',
        num: 7,
        x: 100, y: 5
      },
      checkData: {
        targetWord: 'colles',
        text: ['hill, hillock, eminence, hill-top; mound; high ground; mountains (pl.) (poetic)', 'coll-es']
      }
    }*/
  ]
}
