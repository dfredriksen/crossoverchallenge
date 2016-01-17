const gulp = require('gulp');
const lessc = require('gulp-less');

gulp.task('compileless',['delete'], function () {
  gulp
    .src('./src/components/**/*.less')
    .pipe(lessc())
    .pipe(gulp.dest('./dist/css/components'));

  gulp
    .src('./src/less/*.less')
    .pipe(lessc())
    .pipe(gulp.dest('./dist/css'));

  return true;
});
