'use strict';

const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('less', () =>
  gulp.src('src/less/app.less')
  .pipe(less())
  .pipe(gulp.dest('app/css'))
);
