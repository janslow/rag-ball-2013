module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readJSON('grunt/site.json'),

    // Compile Jekyll and SCSS
    sass: grunt.file.readJSON('grunt/sass.json'),
    jekyll: grunt.file.readJSON('grunt/jekyll.json'),

    // Watch for changes
    watch: grunt.file.readJSON('grunt/watch.json'),
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('serve-jekyll', ['jekyll:serve']);
  grunt.registerTask('default', ['sass', 'jekyll:build']);
};