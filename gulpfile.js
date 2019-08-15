const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const minicss = require('gulp-mini-css');
const htmlreplace = require('gulp-html-replace');
const htmlmin = require('gulp-htmlmin');

gulp.task('build-css', () => (
  gulp.src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('index.css'))
    .pipe(minicss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
));

gulp.task('build-html', () => (
  gulp.src('src/index.html')
    .pipe(htmlreplace({
      css: 'index.css',
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
));

gulp.task('clean', () => (
  gulp.src('dist', { read: false, allowEmpty: true })
    .pipe(clean())
));

gulp.task('default', gulp.parallel('build-css', 'build-html'));
