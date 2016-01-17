const gulp = require('gulp');

gulp.task('collectassets',['delete'], function () {
   gulp
    .src(['./src/components/**/*.gif','./src/components/**/*.jpg','./src/components/**/*.png','./src/components/**/*.svg'])
    .pipe(gulp.dest('./dist/images'));
 
    return true;
});
