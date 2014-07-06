module.exports = function(grunt) {
  'use strict';

  grunt.loadTasks('tasks');

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
    },

    hash: {
      options: {
        prefix: './'
      },
      publics: {
        src: [
          'Gruntfile.js'
          ],
        dest: '<%= dirs.public %>hash'
      }
    }

  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('foo', 'My "foo" task.', function() {
    grunt.log.writeln('Execution de la tache "foo"');
  });

  grunt.registerTask('ok1', 'This task succeds', function() {
    grunt.log.writeln('Execution de la tache "ok1"');
    return true;
  });

  grunt.registerTask('ko2', 'This task fails', function() {
    grunt.log.writeln('Execution de la tache "ko2"');
    return false;
  });

  grunt.registerTask('ok3', 'This task succeds', function() {
    grunt.log.writeln('Execution de la tache "ok3"');
    return true;
  });

  grunt.registerTask('ok-ko', ['ok1', 'ko2', 'ok3']);

  // Default task(s).
  grunt.registerTask('default', ['clean:all', 'jshint', 'shell:gitlog', 'hash', 'watch']);

};
