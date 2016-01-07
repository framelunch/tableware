var
    gulp = require('gulp'),
    bower = require('main-bower-files'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    uglify = require("gulp-uglify"),
    conf = require('../config');

gulp.task('bowerJs', function () {
    return gulp.src(bower(conf.bower))
        .pipe(filter('**/*.js'))
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(conf.dest.dev + '/js'));
});
gulp.task('bowerCss', function () {

});
gulp.task('bower', ['bowerJs', /*'bowerCss'*/], function () {});


gulp.task('b.bowerJs', function () {
    return gulp.src(bower(conf.bower))
        .pipe(filter('**/*.js'))
        .pipe(concat('bower.js'))
        .pipe(uglify())
        .pipe(gulp.dest(conf.dest.build.client + '/js'));
});
gulp.task('b.bower', ['b.bowerJs'], function () {});