var
    gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('dist', function (cb) {
    return runSequence(
        'd.clean',
        'd.webpack',
        cb
    );
});
