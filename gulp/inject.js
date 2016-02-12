/*jslint node: true */
'use strict';

var path = require('path');
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var _ = require('lodash');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var conf = require('./conf');

gulp.task('inject', ['collect'], function() {

  var opts = {
    ignorePath: [conf.paths.tmp],
    addRootSlash: false
  };

  var css = gulp.src(path.join(conf.paths.tmp, "/app/*.css"));

  var scripts = gulp.src([
      path.join(conf.paths.tmp, '/app/**/*.module.js'),
      path.join(conf.paths.tmp, '/app/**/*.js')
    ]).pipe($.angularFilesort())
    .on('error', conf.errorHandler('AngularFilesort'));

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(scripts, opts))
    .pipe($.inject(css, opts))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.test, '.')));
});
