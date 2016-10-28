module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    browserify: {
      dev: {
        dest: "<%= pkg.main %>",
        src: "./src/<%= pkg.name %>.js",
        options: {
          watch: true,
          keepAlive: true,
          browserifyOptions: {
            debug: true,
            standalone: "<%= pkg.name %>",
            transform: [
              ["babelify", {
                presets: "es2015"
              }],
              "browserify-shim"
            ]
          }
        },
      },
      dist: {
        dest: "<%= pkg.main %>",
        src: "./src/<%= pkg.name %>.js",
        options: {
          browserifyOptions: {
            standalone: "<%= pkg.name %>",
            transform: [
              ["babelify", {
                presets: "es2015"
              }],
              "browserify-shim"
            ]
          }
        }
      }
    },

    karma: { unit: { configFile: "karma.conf.js" } },

  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask("dev", ["browserify:dev"]);
  grunt.registerTask("dist", ["browserify:dist"]);
  grunt.registerTask("default", ["dev"]);
  grunt.registerTask("test", ["karma"]);

};
