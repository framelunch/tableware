var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    conf = require('../config');

gulp.task('jasmine', () =>
    gulp.src(conf.jasmine.src)
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmine(conf.option))
);