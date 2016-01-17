const gulp = require('./gulp');
gulp.task('default',['compilejsx','compileless','collectassets','compilelibs']);

gulp.task('no-deps',['compilejsx','compileless','collectassets']);
