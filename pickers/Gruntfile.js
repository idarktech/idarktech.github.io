'use strict';
module.exports = function(grunt) {

  var files = {
    'min/pickers.min.js': 'js/pickers.js'
  };

  // other objects
  var minPath = 'min/objects/';
  var objects = [
    'countries', 'currencies',
    'fonts', 'googlefonts',
    'languages', 'states',
    'timepicker', 'timezones',
    'colorpicker', 'datepicker',
    'fontsizes', 'slider'
  ];

  // dependency for most pickers
  var corefiles = [
    'js/helpers/bootstrap-formhelpers-selectbox.js',
    'js/helpers/bootstrap-formhelpers-{{NAME}}.js',
    'js/helpers/lang/en_US/bootstrap-formhelpers-{{NAME}}.en_US.js',
    'js/objects/{{NAME}}.js'
  ];

  // some pickers dont need the selectbox dependency
  var noSelectBoxDependency = [
    'colorpicker',
    'datepicker',
    // 'timepicker',
    'slider'
  ];

  for (var x = 0; x < objects.length; x++) {
    var filename = objects[x];
    var minFilename = minPath + filename + '.min.js';
    files[minFilename] = [];

    // for slider we must add a dependency
    if (filename === 'slider') {
      files[minFilename].push('js/touchit.js');
    }

    // add every other core files
    for (var y = 0; y < corefiles.length; y++) {
      // some objects dont need the selectbox
      if (y === 0 && noSelectBoxDependency.indexOf(filename) > -1) {
        continue;
      }
      files[minFilename].push(corefiles[y].replace('{{NAME}}', filename));
    }
  }

  grunt.initConfig({
    cssmin: {
      combine: {
        files: {
          'min/styles.min.css': [
            'css/bootstrap-formhelpers.css',
            'css/styles.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: false
        }
      },
      all: {
        options: {
          sourceMap: true
        },
        files: files
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['uglify:all', 'cssmin']);
};
