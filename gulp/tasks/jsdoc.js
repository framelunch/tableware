'use strict';

var 
    gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc3'),
    conf = require('../config');

gulp.task('doc', function (cb) {
    gulp.src(conf.jsdoc.src, {read: false})
        .pipe(jsdoc(conf.jsdoc.config, cb));

});