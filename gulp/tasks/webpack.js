var
    _ = require('lodash'),
    gulp = require('gulp'),
    plumber = require("gulp-plumber"),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    webpack = require('webpack-stream'),
    uglify = require("gulp-uglify"),
    stripDebug = require('gulp-strip-debug'),
    browser = require('browser-sync'),
    conf = require('../config');

gulp.task('webpack.entry', function () {
    return gulp.src(conf.js.src)
        .pipe(rename(function (path) {
            conf.webpack.entry[path.basename] = './js/' + path.basename;
        }));
});

gulp.task('webpack', ['webpack.entry'], function () {
    var c = _.merge({}, conf.webpack, conf.webpackOption.dev);
    
    return gulp.src(conf.js.src)
        .pipe(plumber())
        .pipe(webpack(c))
        .pipe(gulp.dest(conf.dest.dev + '/js'))
        .pipe(browser.reload({stream:true}));
});

gulp.task('b.webpack', ['webpack.entry'], function () {
    var c = _.merge({}, conf.webpack, conf.webpackOption.build);

    gulp.src(conf.js.src)
        .pipe(webpack(c))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(conf.dest.build.client + '/js'))
});


gulp.task('webpack.entryForDist', function () {
    return gulp.src(conf.dest.dist + '/*.js')
        .pipe(rename(function (path) {
            conf.webpack.entry[path.basename] = './' + conf.dest.dist + '/' + path.basename;
        }));
});
gulp.task('d.webpack', ['webpack.entryForDist'], function () {
    var c = _.merge({}, conf.webpack, conf.webpackOption.dist);

    gulp.src(conf.dest.dist + '/*.js')
        .pipe(webpack(c))
        .pipe(stripDebug())

        .pipe(rename(conf.js.rename.normal))
        .pipe(gulp.dest(conf.dest.dist))

        .pipe(uglify())
        .pipe(rename(conf.js.rename.min))
        .pipe(gulp.dest(conf.dest.dist));

});