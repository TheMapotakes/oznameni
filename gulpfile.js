var gulp = require('gulp')
  , gutil = require('gulp-util')
  , watch = require('gulp-watch')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber')
  , sourcemaps = require('gulp-sourcemaps')
  // Server
  , livereload = require('gulp-livereload')

gulp.task('dev', ['development'])
gulp.task('development', ['development-style', '_watch'], function(){
  // dev
})

gulp.task('_watch', function(){
  livereload.listen();

  // Watch style changes
  watcher_style = gulp.watch('./public/css/**/*.less', ['development-style'])
})

gulp.task('development-style', function(){
  gulp.src('./public/css/styles.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less().on('error', gutil.log))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload())
})
