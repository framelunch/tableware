var
    path = require('path'),
    configFile = path.join(process.cwd(), '/karma.conf.js'),
    gulp = require('gulp'),
    Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('e2e', function (done) {
    new Server({
        configFile: configFile,
        singleRun: true
    }, function (result) {
        if (result > 0) { return; }
        done();
    }).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('e2e.tdd', function (done) {
    new Server({
        configFile: configFile
    }, done).start();
});
