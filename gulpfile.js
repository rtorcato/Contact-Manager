var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var rev = require('gulp-rev');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gulpif = require('gulp-if');//Conditionally run a task
var gutil = require('gulp-util');
//var revReplace = require('gulp-rev-replace');
///////
var sourceLess = './resources/styles';
var styleFile = sourceLess + '/app.less';
var targetCss = './public/build/css';
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var rename = require('gulp-rename');


var condition = true; // TODO: add business logic

gulp.task('default', function() {
  // place code for your default task here
  return gulp.src([styleFile])
      //.gutil.log('Gulp is running!')
      .pipe(sourcemaps.init({loadMaps: true}))//
      .pipe(less({compress: true}))//
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(targetCss))
      .pipe(cleanCSS({processImport: false, debug: true, compatibility: 'ie8', keepBreaks:false}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
      }))
      //.pipe(rev())
      .pipe(rename({suffix: '.min'}))
      //.pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(targetCss))
      .pipe(notify("CSS Updated"))
});



// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(sourceLess+'/**/*.less', ['default']);
  //gulp.watch('source/javascript/**/*.js', ['jshint']);
});
