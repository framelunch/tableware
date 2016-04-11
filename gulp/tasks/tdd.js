var gulp = require('gulp'),
    conf = require('../config');

gulp.task('tdd', ['lint', 'jasmine'], function () {
    gulp.watch(conf.watch.js, ['lint', 'jasmine']);
    gulp.watch(conf.watch.jasmine, ['lint', 'jasmine'])
});
