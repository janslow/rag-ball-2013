module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        bundleExec: true,
      },
      scss: {
        files: {
          'site/css/window.css':'scss/window.scss',
          'site/css/simple.css':'scss/simple.scss',
          'site/css/construction.css':'scss/construction.scss',
        },
      },
    },
    jekyll: {
      options: {
        src: 'site/',
        dest: 'bin/debug/',
        bundleExec: true,
      },
      build: {

      },
      serve: {
        options: {
          serve: true,
          port: 8000,
        },
      },
    },
    watch: {
      options: {
        interrupt: true,
      },
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['sass'],
      },
      jekyll: {
        files: 'site/**/*',
        tasks: ['jekyll:build'],
        options: {
          livereload: true,
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('serve-jekyll', ['jekyll:serve']);
  grunt.registerTask('default', ['sass', 'jekyll:build']);
};