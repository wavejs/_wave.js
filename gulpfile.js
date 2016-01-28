'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
// var mocha = require('gulp-mocha');
var prepend = require('gulp-insert').prepend;
var append = require('gulp-insert').append;
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('web', function () {
  return browserify({entries: ['./index.js']})
    .bundle()
    .pipe(source('wave.js'))
    // .pipe(prepend('/* prepend */'))
    // .pipe(append('/* append */'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});