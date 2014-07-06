module.exports = function(grunt) {
  'use strict';

  // Shell logging function
  function logShell(err, stdout, stderr, cb) {
    if (err) {
      grunt.log.error('Command failed on ' + new Date());
    } else {
      grunt.log.ok('Command executed on ' + new Date());
    }
    cb();
  }

  // Project configuration.
  grunt.initConfig({

    // custom variables configuration
    dirs: {
      app:     'app/',
      js:      'app/js/',
      css:     'app/css/',
      public:  'public/'
    },

    files: {
      all: '**/*',
      js:  '**/*.js',
      css: '**/*.css',
      img: '**/*.{png,gif,jpg,jpeg}'
    },

    // contrib-watch plugin configuration.
    watch: {
      jshint: {
        files: ['<%= dirs.js %><%= files.js %>', '<%= dirs.public %><%= files.js %>', 'Gruntfile.js'],
        tasks: 'jshint'
      }
    },

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
   },

   shell: {
    options: {
      failOnError: true,
      callback: logShell,
      stdout: true,
      stderr: true
    },
    gitlog: {
      command: 'git log'
    }
  }

 });


  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['clean:all', 'jshint', 'shell:gitlog', 'watch']);

};
