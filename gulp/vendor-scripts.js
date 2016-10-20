'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('vendor-scripts', () => {
  let files = [
    'lib/angular/angular.js',
    'lib/angular-ui-router/release/angular-ui-router.js',
    'lib/angular-aria/angular-aria.js',
    'lib/angular-animate/angular-animate.js',
    'lib/angular-messages/angulas-messages.js',
    'lib/angular-material/angular-material.js',
    'lib/mobx/lib/mobx.umd.js'
  ];

  return gulp.src(files)
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('app/js'));
});

gulp.task('vendor-scripts:production', () => {
  let files = [
    'lib/angular/angular.min.js',
    'lib/angular-ui-router/release/angular-ui-router.min.js',
    'lib/angular-aria/angular-aria.min.js',
    'lib/angular-animate/angular-animate.min.js',
    'lib/angular-messages/angulas-messages.min.js',
    'lib/angular-material/angular-material.min.js',
    'lib/mobx/lib/mobx.umd.js',
  ];

  return gulp.src(files)
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('build/js'));
});
