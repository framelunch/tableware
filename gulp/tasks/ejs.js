var
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    ejs = require('gulp-ejs'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    prettify = require('gulp-prettify'),
    minifyHtml = require('gulp-minify-html'),
    browser = require('browser-sync'),
    conf = require('../config')
    ;

gulp.task('ejs', function () {
    return gulp.src(conf.ejs.src)
        .pipe(plumber())
        .pipe(ejs())
        .pipe(rename(conf.ejs.rename))
        .pipe(replace(conf.replace.match, conf.replace.to))
        .pipe(gulp.dest(conf.dest.dev))
        .pipe(browser.reload({stream:true}));
});

gulp.task('b.ejs', function () {
    gulp.src(conf.ejs.src)
        .pipe(ejs())
        .pipe(rename(conf.ejs.rename))
        .pipe(replace(conf.replace.match, conf.replace.to))
        //.pipe(prettify({indent_size: 2}))
        .pipe(minifyHtml())
        .pipe(gulp.dest(conf.dest.build.client))
});