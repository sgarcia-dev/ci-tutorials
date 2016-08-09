/*
 * Gulp.task()
 * Defines a Gulp Task using Orchestrator (A module for sequencing
 * and executing tasks and dependencies in maximum concurrency).
 *
 * Gulp.src()
 * Emits files matching provided <string> glob or an array of globs.
 * Returns a stream of Vinyl files that can be piped to plugins.
 *
 * Gulp.dest()
 * Can be piped to and it will write files. Folders that don't exist
 * will be created.
 *
 * Gulp.watch()
 * Watch files and do something when a file changes.
 */

var gulp = require('gulp');

var	gulpPlugins = {
		sass: require('gulp-sass'),
		connect: require('gulp-connect')
	};

var externalPlugins = {
	path: require('path'),
	browserify: require('browserify'),
	vinylSourceStream: require('vinyl-source-stream'),
	vinylBuffer: require('vinyl-buffer')
};

gulp.task('html', function () {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'))
		.pipe(gulpPlugins.connect.reload());
});

gulp.task('styles', function () {
	return gulp.src('./src/index.scss')
		.pipe(gulpPlugins.sass().on('error', gulpPlugins.sass.logError))
		.pipe(gulp.dest('./dist'))
		.pipe(gulpPlugins.connect.reload());
});

gulp.task('scripts', function () {
	return externalPlugins.browserify('./src/index.js')
		.bundle()
		.pipe(externalPlugins.vinylSourceStream('bundle.js'))
		.pipe(externalPlugins.vinylBuffer())
		.pipe(gulp.dest('./dist'))
		.pipe(gulpPlugins.connect.reload());
});

gulp.task('build', ['scripts', 'styles', 'html']);

gulp.task('watch', function () {
	gulp.watch('./src/**/*.js', ['scripts']);
	gulp.watch('./src/**/*.scss', ['styles']);
	gulp.watch('./src/**/*.html', ['html'])
});

gulp.task('serve', ['build', 'watch'], function () {
	gulpPlugins.connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('default', ['serve']);