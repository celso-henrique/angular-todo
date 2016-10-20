'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('vendor-css', () => {
  let files = [
    'lib/angular-material/angular-material.css',
  ];

  return gulp.src(files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('app/css'));
});

gulp.task('vendor-css:production', () => {
  let files = [
    'lib/angular-material/angular-material.min.css',
  ];

  return gulp.src(files)
  .pipe(concat('vendor.min.css'))
  .pipe(gulp.dest('build/css'));
});
