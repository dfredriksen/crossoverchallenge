const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('compilejsx',['delete'], function () {
   gulp
    .src('./src/components/**/*.jsx')
    .pipe(babel({presets:['react']}))
    .pipe(gulp.dest('./dist/components'));

   gulp
    .src('./src/js/**/*.jsx')
    .pipe(babel({presets:['react']}))
    .pipe(gulp.dest('./dist/js'));
 
    return true;
});
