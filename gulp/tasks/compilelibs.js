const gulp = require('gulp');

gulp.task('compilelibs',['delete'], function () {
   gulp
    .src(['./node_modules/bootstrap/dist/**/*'])
    .pipe(gulp.dest('./dist/libs/bootstrap'));

   gulp
    .src(['./node_modules/react/dist/**/*'])
    .pipe(gulp.dest('./dist/libs/react'));
 
   gulp
    .src(['./node_modules/react-dom/dist/**/*'])
    .pipe(gulp.dest('./dist/libs/react-dom'));

   gulp
    .src(['./node_modules/jquery/dist/**/*'])
    .pipe(gulp.dest('./dist/libs/jquery'));

    return true;
});
