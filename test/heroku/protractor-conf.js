exports.config = {   
    seleniumAddress: 'http://localhost:9515',

    specs: ['ng-test.js','addContact.js'],

    capabilities: {
        'browserName': 'phantomjs'
      }
};