module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // contrib-clean plugin configuration.
    clean: {
      all: [
        'public'
      ]
    },

    // contrib-jshint plugin configuration.
    jshint: {
     files: [
       'Gruntfile.js',
       'js/**/*.js'
     ],
     options: {
     }
   }

  });


  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['clean:all', 'jshint']);

};
