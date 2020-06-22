module.exports = {
  // testUrl: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0893.phi002.perseus-lat2/passage/1-30',
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    desktop: {
      browserName: 'firefox',
      // browserVersions: ['68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0'],
      browserVersions: ['75.0'],
      // "minBrowserVersion": "76",
      osVersions: [{ 'os' : 'Windows', 'os_version' : '8.1' }],
      // osVersions: [{ 'os' : 'OS X', 'os_version' : 'Catalina' }],
      timeout: 28000,
      'browserstack.console': 'errors'
    }, 
    mobile: {
      // device: ['Samsung Galaxy S20'],
      // device_browser: 'chrome',
      // device: ['Samsung Galaxy S10'],
      // device: ['Samsung Galaxy S9', 'Samsung Galaxy S8'],
      // device: ['Samsung Galaxy S7', 'Samsung Galaxy S6', 'Samsung Galaxy S5', 'Samsung Galaxy S4'],
      // device: ['Samsung Galaxy Note'],
      // device: ['Samsung Galaxy J7', 'Samsung Galaxy Tab'],
      // device: ['Google Pixel 4'],
      // device: ['Google Pixel 3'],
      // device: ['Google Pixel 2', 'Google Pixel XL', 'Google Nexus'],
      // device: ['OnePlus'],
      // device: ['Moto'],
      // device: ['Xiaomi', 'LG', 'Xperia'],
      device: ['Samsung Galaxy S20 Ultra', 'iPhone 11 Pro Max'],
      // osVersions: [{ 'os' : 'ios', 'os_version' : '13' }],
      device_browser: 'chrome',
      realMobile: true,
      'browserstack.console': 'errors'
    }
  },
  lookupData: [
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
        path: '#syr-text-1'
      },
      checkData: {
        targetWord: 'ܠܗܘܢ',
        text: ['twelfth letter of the alphabet (Lomadh)', 'numerical value: 30', 'temps']
      }
    },
    {
      clickData: {
        path: '#per-text-1'
      },
      checkData: {
        targetWord: 'گمان',
        text: ['Doubt, suspicion, surmise;']
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
    }/*,
    {
      clickData: {
        path: '#zho-text-shui'
      },
      checkData: {
        targetWord: '說',
        text: ['to appeal to', 'to meet', 'be present']
      }
    }*/
    
  ]
}
