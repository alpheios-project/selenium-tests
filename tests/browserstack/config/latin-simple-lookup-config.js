module.exports = {
  // testUrl: 'https://texts.alpheios.net',
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    desktop: {
      browserName: 'firefox',
      // browserVersions: ['68.0', '67.0', '66.0', '65.0', '64.0', '63.0', '62.0'],
      browserVersions: ['75.0'],
      // minBrowserVersion: "70",
      osVersions: [{ 'os' : 'Windows', 'os_version' : '10' }],
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
      // device: ['iPhone 11 Pro Max', 'iPhone XS', 'Samsung Galaxy S20 Plus', 'Google Pixel 4', 'Xiaomi Redmi Note 7', 'iPad Pro 11 2018' ],
      device: ['iPhone 11 Pro Max', 'Samsung Galaxy S20 Plus' ],
      // device_browser: 'safari',
      device_like: false,
      // osVersions: [{ 'os' : 'ios', 'os_version' : '13' }], 
      realMobile: true,
      'browserstack.console': 'errors'
    }
  },
  lookupData: [
    {
      clickData: {
        word: 'beatum',
      },
      checkData: {
        text: ['happy, fortunate, bringing happiness rich', 'blessed, blissful; "Saint" (in early Church, less formal);'],
        checkInflections: false
      }
    }/*,
    {
      clickData: {
        word: 'male',
      },
      checkData: {
        text: ['apple tree', 'femininenoun; 2nd declension']
      }
    }*/
  ]
}
