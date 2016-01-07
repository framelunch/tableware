var
  gulp = require('gulp'),
  del = require('del'),
  conf = require('../config');

gulp.task('clean', del.bind(null, [conf.dest.dev]));
gulp.task('b.clean', del.bind(null, [conf.dest.build.client]));

gulp.task('d.clean', del.bind(null, [
    conf.dest.dist + '/**/*',
    '!' + conf.dest.dist + '/*.js',
    '!' + conf.dest.dist + '/*.html'
]));