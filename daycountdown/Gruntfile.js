'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        compress: {
          drop_console: false
        }
      },
      all: {
        files : {
          'min/scripts.min.js' : ['assets/countdown/jquery.countdown.js', 'assets/js/script.js']
        }
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify:all']);
};