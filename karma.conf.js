// Karma configuration
// Generated on Mon Jan 25 2016 10:09:26 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  var cfg = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'lib/components/angular/angular.js',
      'lib/components/angular-mocks/angular-mocks.js',

      'lib/components/angular-highlightjs/build/angular-highlightjs.min.js',
      'lib/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'lib/components/angular-smart-table/dist/smart-table.min.js',
      'lib/components/angular-bootstrap-file-field/dist/angular-bootstrap-file-field.min.js',
      'lib/components/angular-animate/angular-animate.min.js',
      'lib/components/AngularJS-Toaster/toaster.min.js',
      'lib/components/angulartics/dist/angulartics.min.js',
      'lib/components/angulartics-google-analytics/dist/angulartics-ga.min.js',

      'js/app.ctrl.js',
      'js/*.js',
      'tests/*.js'
    ],


    // list of files to exclude
    exclude: [
      'js/analytics.js',
      'js/app.config.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'js/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
        Chrome_Travis_CI: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        },
        Firefox_Travis_CI: {
            base: 'Firefox'
        }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  //Use Firefox for the tests on TravisCI.
  if (process.env.TRAVIS) {
      cfg.browsers = ['Firefox_Travis_CI'];
  }

  config.set(cfg);
};
