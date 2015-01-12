/*
 * Authored by  AlmogBaku
 *              almog.baku@gmail.com
 *              http://www.almogbaku.com/
 *
 * 11/12/14 14:00
 */

'use strict';
var paths = ['!bower_components/**', '!packages/contrib/**', 'packages/**/public/**/*.scss'];

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mean-compass');

  grunt.config.merge({
    watch: {
      sass: {
        files: ['!bower_components/**', '!packages/contrib/**', 'packages/**/public/**/*.scss'],
        tasks: ['meanCompass'],
        options: {
          livereload: true
        }
      }
    },
    meanCompass: {
      main: {
        src: paths,
        options: {
        }
      }
    }
  });

  //Inject the task to the task list
  grunt.hook.push('meanCompass', -100);
};