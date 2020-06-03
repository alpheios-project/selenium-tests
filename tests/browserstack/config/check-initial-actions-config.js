module.exports = {
  testUrl: 'https://alpheios-misc-dev.s3.us-east-2.amazonaws.com/selenium-tests/index.html',
  env: {
    browserName: 'safari',
    // browserVersions: ['72.0'],
    // osVersions: [{ 'os' : 'OS X', 'os_version' : 'Catalina' }]
  },
  checkData: {
    help: ['Help', 'FAQ/Known Issues', 'Double-click on a word to see lemmas'],
    inflBrowser: ['Browse Inflection Tables', 'Latin Inflection Browser', 'Greek Inflection Browser'],
    grammar: ['Allen and Greenough’s New Latin Grammar for Schools and Colleges'],
    user: ['Log In'],
    options: ['Resize options', 'Panel position:']
  }
}
