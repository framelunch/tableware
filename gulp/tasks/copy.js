var
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    conf = require('../config');

gulp.task('copy', function () {
    gulp.src(conf.copy.assets)
        .pipe(gulpif('*.{png,jpg,gif}', imagemin()))
        .pipe(gulp.dest(conf.dest.build.client + '/assets'));
});
