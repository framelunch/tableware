var
    gulp = require('gulp'),
    browser = require('browser-sync'),
    conf = require('../config');

gulp.task("server", function () {
    browser(conf.browser);
});