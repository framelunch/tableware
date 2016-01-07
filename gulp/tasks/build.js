var
  gulp = require('gulp'),
  runSequence = require('run-sequence');

gulp.task('build', function (cb) {
  return runSequence(
    'b.clean',
    ['b.bower', 'b.sass', 'b.ejs', 'b.webpack'],
    'copy',
    cb
  );
});