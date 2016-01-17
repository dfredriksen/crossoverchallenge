const gulp = require('./gulp');
gulp.task('default',['compilejsx','compileless','compilelibs']);

gulp.task('no-deps',['compilejsx','compileless']);
