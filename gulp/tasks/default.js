var
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    conf = require('../config');

gulp.task('dev', function (cb) {
    return runSequence(
        'clean',
        ['bower', 'sass', 'ejs', 'webpack', 'lint'],
        'server',
        cb
    );
});

gulp.task('default', ['dev'], function () {
    gulp.watch(conf.watch.ejs, ['ejs']);
    gulp.watch(conf.watch.sass, ['sass']);
    gulp.watch(conf.watch.js, ['webpack', 'lint']);
});
