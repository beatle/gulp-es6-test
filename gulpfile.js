var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var html2js = require('gulp-html-js-template');
var template = require('gulp-template-compile');
// @todo: try for gulp-requirejs-wrap-text 
// @link: https://www.npmjs.com/package/gulp-requirejs-wrap-text

gulp.task('build:tpl', function () {
    return gulp.src('app/templates/**.html')
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:es6', function () {
    return gulp.src('app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            modules: 'amd',
            moduleIds: true
        }))
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build:es6', 'build:tpl']);

