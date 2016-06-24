'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    replace = require('gulp-replace'),
    browserify = require('gulp-browserify'),
    jsdoc = require('gulp-jsdoc3');

var pkg = require('./package');

var banner = '/**\n' + 
             ' * <%= pkg.name %> - <%= pkg.description %>\n' + 
             ' * @version v<%= pkg.version %>\n' + 
             ' * @author <%= pkg.author %>\n' + 
             ' * @contributors <%= pkg.contributors %>\n' + 
             ' * @license <%= pkg.license %>\n' + 
             ' * @link <%= pkg.homepage %>\n' + 
             ' */\n';

// for Browser
gulp.task('build', function () {
    return gulp.src('src/WaveBrowser.js')
        .pipe(replace(/@@VERSION/g, pkg.version))
        .pipe(browserify({standalone: 'vv'}))
        .pipe(rename('wave-' + pkg.version + '.js'))
        .pipe(gulp.dest('dist'));
});

// js-doc
gulp.task('doc1', function(cb) {
    gulp.src(['README.md', 'src/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task('doc2', function(cb) {
    var config = require('./configjsdoc.json');
    gulp.src(['README.md', 'src/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

// for Browser
gulp.task('build-min', function () {
    return gulp.src('src/WaveBrowser.js')
        .pipe(replace(/@@VERSION/g, pkg.version))
        .pipe(browserify({standalone: 'wave'}))
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename('wave-' + pkg.version + '.min.js'))
        .pipe(gulp.dest('dist'));
});

// lint
gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

// test
gulp.task('test', function () {
    return gulp.src('test/index.js', {read: false})
        .pipe(mocha());
});

// watch
gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['lint', 'test', 'build']);
});