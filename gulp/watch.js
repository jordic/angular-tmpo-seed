/*jslint node: true */
'use strict';

var path = require('path'),
	gulp = require('gulp'),
	conf = require('./conf'),
	watch = require('gulp-watch');

function pj(s) {
	return path.join(conf.paths.src, s);
}

function changed(isChange, other) {
	return function(ev) {
		if (ev.type === 'changed') {
			return gulp.start(isChange);
		}
		return gulp.start(other);
	};
}


gulp.task('watch', ['inject'], function() {
	// Watch SASS
	watch([
		pj('/app/**/*.scss'),
		pj('/app/**/*.css')
	], function() {
		gulp.start('collect:css');
	});

	// watch js
	watch([
		pj('/app/**/*.js')
	], changed("collect:app", "inject"));

	// watch htmls
	watch([
		pj('app/**/*.html')
	], changed("collect:partials", "inject"));

	// Watch bower
	watch('bower.json', function() {
		gulp.start("inject");
	});

});
