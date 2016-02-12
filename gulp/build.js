/*jslint node: true */
'use strict';

var path = require('path'),
	gulp = require('gulp'),
	conf = require('./conf'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch');

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var pt = conf.pt,
	pd = conf.pd,
	ps = conf.ps;


gulp.task('dist:fonts', function() {
	return gulp.src($.mainBowerFiles())
		.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(pd('/fonts/')));
});



gulp.task('dist:other', function() {
	var fileFilter = $.filter(function(file) {
		return file.stat.isFile();
	});
	return gulp.src([
			pt('/**/*'),
			path.join('!' + conf.paths.src, '/**/*.{html,css,js}')
		])
		.pipe(fileFilter)
		.pipe(gulp.dest(pd('/')));
});


gulp.task('dist', ['inject', 'dist:fonts', 'dist:other'], function() {
	var assets;
	var htmlFilter = $.filter('*.html', {
		restore: true
	});
	var jsFilter = $.filter('**/*.js', {
		restore: true
	});
	var cssFilter = $.filter('**/*.css', {
		restore: true
	});

	return gulp.src(pt('*.html'))
		.pipe(assets = $.useref.assets())
		.pipe($.rev())
		.pipe(jsFilter)
		// .pipe($.sourcemaps.init())
		.pipe($.ngAnnotate())
		.pipe($.uglify({
			preserveComments: $.uglifySaveLicense
		})).on('error', conf.errorHandler('Uglify'))
		// .pipe($.sourcemaps.write('maps'))
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		// .pipe($.sourcemaps.init())
		.pipe($.replace(
			'../../bower_components/bootstrap-sass/assets/fonts/bootstrap/',
			'../fonts/'))
		.pipe($.minifyCss({
			processImport: false
		}))
		// .pipe($.sourcemaps.write('maps'))
		.pipe(cssFilter.restore)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())
		.pipe(htmlFilter)
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		}))
		.pipe(htmlFilter.restore)
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
		.pipe($.size({
			title: path.join(conf.paths.dist, '/'),
			showFiles: true
		}));
});


gulp.task('clean', function() {
	return $.del([pt("/"), pd("/")]);
});

gulp.task('serve', ['inject', 'watch'], function() {
	connect.server({
		root: [conf.paths.tmp],
		livereload: true
	});
});
