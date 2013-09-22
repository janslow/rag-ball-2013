module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readJSON('grunt/site.json'),
    banner: "Copyright <%= pkg.author %> 2013 - <%= pkg.homepage %> - v<%= pkg.version %>",

    // Compile Jekyll and SCSS
    sass: grunt.file.readJSON('grunt/sass.json'),
    jekyll: grunt.file.readJSON('grunt/jekyll.json'),

    // Minify files
    cssmin: grunt.file.readJSON('grunt/cssmin.json'),
    uglify: grunt.file.readJSON('grunt/uglify.json'),
    htmlmin: grunt.file.readJSON('grunt/htmlmin.json'),
    imagemin: grunt.file.readJSON('grunt/imagemin.json'),

    // Copy files (which don't need minification)
    copy: grunt.file.readJSON('grunt/copy.json'),

    // Lint and validate files
    jshint: grunt.file.readJSON('grunt/jshint.json'),
    csslint: grunt.file.readJSON('grunt/csslint.json'),
    validation: grunt.file.readJSON('grunt/validation.json'),
    
    // Watch for changes
    watch: grunt.file.readJSON('grunt/watch.json'),

    // Deploy release to gh-pages branch
    'gh-pages': grunt.file.readJSON('grunt/gh-pages.json'),

    // Deploy release to gh-pages branch
    'ftp-deploy': grunt.file.readJSON('grunt/ftp-deploy.json'),

    // Update HTML files with minified links
    usemin: grunt.file.readJSON('grunt/usemin.json'),
    'useminPrepare': grunt.file.readJSON('grunt/useminPrepare.json'),

    //Clean destination directories
    clean: grunt.file.readJSON('grunt/clean.json')
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('minify', ['useminPrepare', 'concat', 'cssmin', 'uglify', 'copy:release-html', 'usemin', 'htmlmin', 'imagemin']);
  grunt.registerTask('lint:staging', ['jshint:staging', 'validation:staging']);
  grunt.registerTask('lint:release', ['jshint:release', 'validation:release']);
  
  grunt.registerTask('debug', ['clean:debug', 'jekyll:serve']);
  grunt.registerTask('stage', ['clean:css', 'sass', 'clean:staging', 'jekyll:stage', 'lint:staging']);
  grunt.registerTask('release', ['stage', 'clean:release', 'copy:release-misc', 'minify', 'lint:release']);
  grunt.registerTask('deploy', ['gh-pages:deploy']);
  
  grunt.registerTask('default', ['release']);
};