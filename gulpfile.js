'use strict';

const gulp = require('gulp');
require('require-dir')('./gulp');

gulp.task('build', ['scripts', 'vendor-scripts', 'vendor-css', 'less']);
gulp.task('build:production', ['scripts', 'vendor-scripts:production', 'vendor-css:production', 'html-replace', 'less'], () =>
  gulp.start(['uglify-scripts', 'clean-css'])
);

gulp.task('serve', ['build','watch', 'webserver']);
gulp.task('serve:production', ['build:production', 'webserver:production']);

gulp.task('default', ['serve']);
