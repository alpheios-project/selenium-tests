module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    desktop: {
      browserName: 'safari',
      browserVersions: ['12.1','13.1'],
      osVersions: [
        {'os': 'OS X', 'os_version': 'Mojave'},
        {'os': 'OS X', 'os_version': 'Catalina'}
      ],
      timeout: 28000,
      'browserstack.console': 'errors'
    },
    mobile: {
      device: ['Samsung Galaxy S20 Plus'],
      device_browser: 'chrome',
      device_like: false,
      osVersions: [
        { 'os' : 'android', 'os_version' : '9.0' },
        { 'os' : 'android', 'os_version' : '10.0' }
      ],
      timeout: 28000,
      realMobile: true,
      'browserstack.console': 'errors'
    }
  }
}
