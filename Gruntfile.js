/**
 * Created by Andrew on 2/27/16.
 */
module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      externalScripts: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: 'site/resources/scripts/external.min.js'
      },
      externalStyles: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ],
        dest: 'site/resources/styles/external.min.css'
      }
    },

    copy: {
      externalFiles: {
        files: [
          {
            src: [
              'bower_components/bootstrap/dist/fonts/glyphicons-*'
            ],
            dest: 'site/resources/fonts/',
            expand: true,
            flatten: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat:externalScripts', 'concat:externalStyles', 'copy:externalFiles']);
};