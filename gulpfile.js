var gulp = require('gulp'),
    concat = require('gulp-concat');

var paths = {
    js:['src/wave.prefix.js','src/core.js','src/utils/*.js','src/wave.suffix.js']
}

gulp.task('prototype', function(){
    return gulp.src(paths.js)
        .pipe(concat('wave.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('default', ['prototype']);