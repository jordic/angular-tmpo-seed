/*jslint node: true */
'use strict';

var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var conf = require('./conf');

// Collects node_modules and copies them to dev
gulp.task('collect:vendor', function() {
  var wire = require('wiredep');
  var js = wire().js;
  var css = wire().css;
  var files = js.concat(css);
  return gulp.src(files, {
      base: "."
    })
    .pipe(gulp.dest(conf.paths.tmp));
});

// Collect app files
gulp.task('collect:app', function() {
  return gulp.src([
      path.join(conf.paths.src, '/app/**/*.js'),
      path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
      path.join('!' + conf.paths.src, '/app/**/*.mock.js')
    ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(gulp.dest(path.join(conf.paths.tmp, "app/")))
    .pipe($.size());
});

gulp.task('collect:partials', function() {
  return gulp.src([
      path.join(conf.paths.src, '/app/**/*.html'),
      path.join('!' + conf.paths.src, '/app/index.html')
    ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'mnt',
      root: 'app',
      templateHeader: '(function() { angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
      templateFooter: '}]);})();'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/app/'));
});


gulp.task('collect:index', function() {
  return gulp.src(path.join(conf.paths.src, '*.html'))
    .pipe(gulp.dest(conf.paths.tmp));
});

gulp.task('collect:other', function() {

  var fileFilter = $.filter(function(file) {
    return file.stat.isFile();
  });
  return gulp.src([
      path.join(conf.paths.src, '/**/*'),
      path.join('!' + conf.paths.src, '/**/*.{html,css,js}')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/')));
});

gulp.task('collect:css', function() {
  return gulp.src([
      path.join(conf.paths.src, '/app/index.scss'),
      path.join(conf.paths.src, '/app/**/*.scss'),
      path.join(conf.paths.src, '/app/**/**/*.scss')
    ])
    .pipe(sass({
      style: 'expanded'
    }).on('error',
      conf.errorHandler("sass")
    ))
    .pipe($.autoprefixer())

  .pipe(concat('app.css'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/app/')));
});


gulp.task('collect', [
  'collect:vendor',
  'collect:app',
  'collect:partials',
  'collect:index',
  'collect:css',
  'collect:other'
]);
