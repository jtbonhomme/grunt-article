module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Project configuration.
    clean: {
      all: [
        'public'
      ]
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean:all']);

};
