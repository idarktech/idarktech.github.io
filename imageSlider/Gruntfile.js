'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    cssmin : {
      combine : {
        files : {
          'min/styles.min.css' : ['style.css']
        }
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      all: {
        files : {
          'min/scripts.min.js' : [
            '../lib/javascript/Class.js',
            '../lib/polyfills/function_bind.js',
            'js/jquerySlider.js',
            'js/scripts.js'
          ]
        }
      }
    },
  });

  grunt.registerTask('default', ['uglify:all','cssmin']);
};