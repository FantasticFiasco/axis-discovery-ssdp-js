var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var tslint = require("gulp-tslint");
var del = require('del');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
	return del([
		'lib/**/*'
	]);
});

gulp.task('build', ['clean'], function() {
	return gulp.src('src/**/*.ts')
		.pipe(tsProject())
		.pipe(gulp.dest("lib"));
});

gulp.task('test', ['build'], function() {
	return gulp.src(['lib/**/*.spec.js'], { read: false })
		.pipe(mocha());
});

gulp.task('lint', function() {
	return gulp.src('src/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report());
});