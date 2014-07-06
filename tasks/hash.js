/* jshint node:true */

var crypto = require('crypto');

module.exports = function(grunt) {
  'use strict';

  function md5(file) {
    var data = grunt.file.read(file, { encoding: null });
    return crypto.createHash('md5').update(data).digest('hex');
  }

  grunt.registerMultiTask('hash', 'Create the hash file', function() {
    var prefix = new RegExp('^' + this.options().prefix);

    var hashes = [];
    var maxlen = 0;

    this.files.forEach(function(files) {
      files.src.map(function(file) {
        var name = file.replace(prefix, '') + ':';
        maxlen = Math.max(maxlen, name.length);
        return [name, md5(file)];
      }).forEach(function(data) {
        hashes.push(grunt.log.table([maxlen + 4, 32], data));
      });
    });

    hashes = hashes.join('\n') + '\n';

    grunt.log.writeln(hashes);
    grunt.log.write('Generating ' + this.data.dest.cyan + '...');
    grunt.file.write(this.data.dest, hashes);
    grunt.log.ok();
  });

};
