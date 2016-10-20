const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
 
gulp.task('html-replace', function() {
  gulp.src('app/index.html')
    .pipe(htmlreplace({
      'css': ['css/vendor.min.css', 'css/app.min.css'],
      'js': ['js/vendor.min.js', 'js/app.min.js']
    }))
  .pipe(gulp.dest('build/'));
});
