'use strict';

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('clean-css', () =>
  gulp.src('app/css/app.css')
  .pipe(cleanCSS())
  .pipe(rename('app.min.css'))
  .pipe(gulp.dest('build/css'))
);
