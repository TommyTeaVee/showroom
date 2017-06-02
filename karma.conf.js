"use strict";

module.exports = function(karma) {
  karma.set({

    frameworks: [ "jasmine", "browserify", "fixture" ],

    files: [
      { pattern: "./test/setup.js", watched: false, included: true },
      { pattern: "./test/**/*.js", watched: false, included: true },
      { pattern: "./test/fixtures/**/*.html", watched: false, included: true, served: true }
    ],

    reporters: [ "spec" ],

    specReporter: {
      maxLogLines: 10,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },

    preprocessors: {
      "test/**/*.js": "browserify",
      "test/fixtures/**/*.html": "html2js"
    },

    browserify: {
      debug: true,
      paths: ["src", "test/spec"],
      transform: [ ["babelify", { presets: ["es2015-ie"], plugins: ["transform-es2015-classes"] }] ]
    },

    singleRun: false,
    autoWatch: true
  });
};
