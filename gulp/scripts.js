'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

gulp.task('scripts', () =>
  gulp.src('src/js/**/*.js')
  .pipe(concat('app.js'))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('app/js'))
);
