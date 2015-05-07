var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
  app: './src/js/app.js',
  src: 'src/js/**/*.*',
  buildJs: 'build/js/',
  buildCss: 'build/css/',
  build: 'build/',
  html: 'src/index.html',
  scss: 'src/scss/**/*.scss',
  scssMain: 'src/scss/main.scss'
};

gulp.task('browserify', function () {
  var b = browserify({
    entries: paths.app,
    debug: true,
    transform: ['babelify']
  });

  return b.bundle()
          .pipe(source('app.js'))
          .pipe(gulp.dest(paths.buildJs));
});

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.src, ['browserify']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scss, ['scss']);
  
  gulp.watch(paths.buildJs + '*.js').on('change', reload);
  gulp.watch(paths.build + '*.html').on('change', reload);
});

/**
 * Copy index.html file into build folder and reload browserSync
 */
gulp.task('html', function () {
  gulp.src(paths.html)
      .pipe(gulp.dest(paths.build));
});

/**
 * Compile main Scss file into build folder and stream update browserSync
 */
gulp.task('scss', function () {
  gulp.src(paths.scssMain)
      .pipe(sass())
      .pipe(gulp.dest(paths.buildCss))
      .pipe(reload({stream: true}));
})

gulp.task('browserSync', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
});

gulp.task('build', ['browserify', 'html', 'scss']);

gulp.task('default', ['browserSync']);