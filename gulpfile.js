'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var replace = require('gulp-replace');
var browserify = require('gulp-browserify');
// var buffer = require('vinyl-buffer');
// var source = require('vinyl-source-stream');

var pkg = require('./package');
var banner = '/**\n' + 
             ' * <%= pkg.name %> - <%= pkg.description %>\n' + 
             ' * @version v<%= pkg.version %>\n' + 
             ' * @author <%= pkg.author %>\n' + 
             ' * @contributors <%= pkg.contributors %>\n' + 
             ' * @license <%= pkg.license %>\n' + 
             ' * @link <%= pkg.homepage %>\n' + 
             ' */\n';
var opts = {
  entries: ['src/Wave.js'],
  standalone: 'wave'
};

gulp.task('build', function () {
  return gulp.src('src/WaveBrowser.js')
    .pipe(replace(/@@VERSION/g, pkg.version))
    .pipe(browserify({standalone: 'wave'}))
    .pipe(rename('wave-' + pkg.version + '.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-min', function () {
  return gulp.src('src/WaveBrowser.js')
    .pipe(replace(/@@VERSION/g, pkg.version))
    .pipe(browserify({standalone: 'wave'}))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename('wave-' + pkg.version + '.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
  return gulp.src('dist/*.js')
  // return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.extract('require|exports'))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// test
gulp.task('test', function () {
  return gulp.src('test/index.js', {read: false})
    .pipe(mocha());
});

// watch
// gulp.watch('src/**/*.js', []);

// watch
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['build']);
});