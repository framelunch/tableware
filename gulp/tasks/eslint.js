var 
    gulp = require('gulp'),
    plumber = require("gulp-plumber"),
    eslint = require('gulp-eslint'),
    config = require('../config')
    ;

gulp.task('eslint', function () {
    return gulp.src(config.eslint.src)
        .pipe(plumber())
        .pipe(eslint(config.eslint.option))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        //.pipe(eslint.formatEach('compact', process.stderr));
});