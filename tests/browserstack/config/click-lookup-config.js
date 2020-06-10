module.exports = {
  // testUrl: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0893.phi002.perseus-lat2/passage/1-30',
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'firefox',
    browserVersions: ['72.0'],
    osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }]
  },
  lookupData: [/*
    {
      clickData: {
        path: '#latin-text-fero'
      },
      checkData: {
        targetWord: 'fero',
        text: 'ferus: wild, savage; uncivilized; untamed; fierce;'
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
    },
    {
      clickData: {
        path: '#greek-text-andra'
      },
      checkData: {
        targetWord: 'ἄνδρα',
        text: ['ἀνήρ', 'masculine', '3rd declension']
      }
    },
    {
      clickData: {
        path: '#ara-text-sultan'
      },
      checkData: {
        targetWord: 'سُلطَان',
        text: ['noun', 'power', 'Sultan']
      }
    },
    {
      clickData: {
        path: '#gez-text-igizi'
      },
      checkData: {
        targetWord: 'እግዚአብሔር',
        text: ['common noun', 'dominus, universi, Dei']
      }
    },
    {
      clickData: {
        path: '#syr-text-1'
      },
      checkData: {
        targetWord: 'ܠܗܘܢ',
        text: ['twelfth letter of the alphabet (Lomadh)', 'numerical value: 30', 'temps']
      }
    },*/
    {
      clickData: {
        path: '#zho-text-shui'
      },
      checkData: {
        targetWord: '說',
        text: ['to appeal to', 'to meet', 'be present']
      }
    }
    
  ]
}
