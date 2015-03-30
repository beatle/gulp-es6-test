var gulp = require('gulp');
var babel = require('gulp-babel');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var template = require('gulp-template-compile');
var handlebars = require('gulp-handlebars');
// var declare = require('gulp-declare');
var wrap = require('gulp-wrap');
var defineModule = require('gulp-define-module');
var amdOptimize = require('gulp-amd-optimizer');
var emberTemplates = require('gulp-ember-templates');
var jst = require('gulp-amd-jst');
var amdWrap = require('gulp-wrap-amd');

var paths = {
    scripts: ['app/**/*.js'],
    tpl: ['app/templates/**/*.html'],
    errorLog: 'error.log',
    dest: 'dist',
    tplDest: 'dist/tpl'
};

var requireConfig = {
  baseUrl: './' //,
  // paths: {
      // "handlebars": "bower_components/handlebars/handlebars.runtime.amd"
  // },
};
var options = {
  // umd: false
};
var browserify = require('gulp-browserify');
var browserifyHandlebars = require('browserify-handlebars');

// gulp.task('scripts', function() {
//     // Single entry point to browserify
//     gulp.src('src/js/app.js')
//     .pipe(browserify({
//         transform: [browserifyHandlebars]
//     }))
//     .pipe(gulp.dest(paths.dest))
// });

// gulp.task('templates:optimize', ['templates'], function() {
//     return gulp.src('src#<{(|.js', {base: requireConfig.baseUrl})
//     ;
// });


gulp.task('templates', function() {
  // Load templates from the templates/ folder relative to where gulp was executed
  gulp.src(paths.tpl)
    // .pipe(jst({
    //     amd : true,
    //     prettify : true,
    //     namespace : true
    // }))
    // Compile each Handlebars template source file to a template function
    // .pipe(handlebars())
    // Define templates as AMD modules
    //
    .pipe(usemin({
        html: [minifyHtml({empty: true})]
    }))
    // .pipe(wrap('\'<%= contents %>\''))
    // .pipe(amdWrap({
    //     // deps: ['handlebars'],          // dependency array
    //     // params: ['handlebars'],        // params for callback
    //     // exports: 'handlebars',         // variable to return
    //     moduleRoot: './' // include a module name in the define() call, relative to moduleRoot
    // }))
    // .pipe(amdOptimize(requireConfig, options))
    // Write the output into the templates folder
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.dest));
});
// gulp.task('templates', function() {
//   // Load templates from the templates/ folder relative to where gulp was executed
//   gulp.src(paths.tpl)
//     // .pipe(jst({
//     //     amd : true,
//     //     prettify : true,
//     //     namespace : true
//     // }))
//     // Compile each Handlebars template source file to a template function
//     .pipe(handlebars())
//     // Define templates as AMD modules
//     .pipe(defineModule('amd'))
//     // .pipe(amdOptimize(requireConfig, options))
//     // Write the output into the templates folder
//     // .pipe(concat('templates.js'))
//     .pipe(gulp.dest(paths.dest));
// });
//
// gulp.task('templates', function(){
//   gulp.src(paths.tpl)
//     .pipe(handlebars())
//     .pipe(wrap('Handlebars.template(<%= contents %>)'))
//     .pipe(declare({
//           namespace: 'MyApp.templates',
//           noRedeclare: true, // Avoid duplicate declarations
//         }))
//     .pipe(concat('templates.js'))
//     .pipe(gulp.dest(paths.dest));
// });

gulp.task('build:tpl', function () {
    return gulp.src(paths.tpl)
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(paths.dest));
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
        .pipe(gulp.dest(paths.dest));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.tpl, ['build:tpl']);
});

gulp.task('scripts', ['build:es6']);
gulp.task('default', ['build:es6', 'build:tpl']);

