var
    gulp = require('gulp'),
    plumber = require("gulp-plumber"),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require("gulp-autoprefixer"),
    minifyCss = require("gulp-minify-css"),
    browser = require('browser-sync'),
    conf = require('../config');

gulp.task('sass', function () {
    return gulp.src(conf.sass.src)
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(replace(conf.replace.match, conf.replace.to))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dest.dev + '/css'))
        .pipe(browser.reload({stream:true}));
});

gulp.task('b.sass', function () {
    gulp.src(conf.sass.src)
        .pipe(sass())
        .pipe(replace(conf.replace.match, conf.replace.to))
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest(conf.dest.build.client + '/css'))
});