module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readJSON('grunt/site.json'),

    // Compile Jekyll and SCSS
    sass: grunt.file.readJSON('grunt/sass.json'),
    jekyll: grunt.file.readJSON('grunt/jekyll.json'),

    // Minify HTML, CSS and JS
    cssmin: grunt.file.readJSON('grunt/cssmin.json'),
    uglify: grunt.file.readJSON('grunt/uglify.json'),
    htmlmin: grunt.file.readJSON('grunt/htmlmin.json'),

    // Watch for changes
    watch: grunt.file.readJSON('grunt/watch.json'),

    //Clean destination directories
    clean: {
      debug: ['<%= site.debug %>'],
      staging: ['<%= site.staging %>'],
      release: ['<%= site.release %>'],
      css: ['<%= site.css %>']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('minify', ['cssmin', 'uglify']);
  
  grunt.registerTask('debug', ['clean:debug', 'jekyll:serve']);
  grunt.registerTask('stage', ['clean:css', 'sass', 'clean:staging', 'jekyll:stage'])
  grunt.registerTask('release', ['stage', 'clean:release', 'minify']);
  
  grunt.registerTask('default', ['release']);
};