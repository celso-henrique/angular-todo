'use strict';

const gulp = require('gulp');

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/less/**/*.less', ['less']);
});

