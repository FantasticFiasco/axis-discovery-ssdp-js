var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var tslint = require("gulp-tslint");
var del = require('del');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
	return del([
		'dist/**/*'
	]);
});

gulp.task('build', ['clean'], function() {
	return gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest("dist/js"));
});

gulp.task('test', ['build'], function() {
	return gulp.src(['dist/js/**/*.spec.js'], { read: false })
		.pipe(mocha());
});

gulp.task('lint', function() {
	return gulp.src('src/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report());
});