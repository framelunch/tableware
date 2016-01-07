var
  gulp = require('gulp'),
  spritesmith = require('gulp.spritesmith'),
  conf = require('../config');

gulp.task('sprite', function () {
  var spriteData =
    gulp.src(conf.sprite.src)
      .pipe(spritesmith(conf.sprite.option));

  spriteData.img
    .pipe(gulp.dest(conf.sprite.dest.img));

  spriteData.css
    .pipe(gulp.dest(conf.sprite.dest.css));
});
