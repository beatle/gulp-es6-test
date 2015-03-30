var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var template = require('gulp-template-compile');

var paths = {
    scripts: ['app/**/*.js'],
    tpl: ['app/templates/**/*.html'],
    errorLog: 'error.log'
};

gulp.task('build:tpl', function () {
    return gulp.src(paths.tpl)
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:es6', function () {
    return gulp.src(paths.scripts)
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

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.tpl, ['build:tpl']);
});

gulp.task('scripts', ['build:es6']);
gulp.task('default', ['build:es6', 'build:tpl']);

