'use strict';

const gulp = require('gulp');
const server = require('gulp-server-livereload');

gulp.task('webserver', () =>
  gulp.src('app')
  .pipe(server({
    livereload: true,
    directoryListing: false,
    open: true
  }))
);

gulp.task('webserver:production', () =>
  gulp.src('build')
  .pipe(server({
    livereload: false,
    directoryListing: false,
    open: true
  }))
);
