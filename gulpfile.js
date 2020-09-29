// =========================================================
// gulpfile.js
// =========================================================
// ------------------------------------------------ requires
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// ------------------------------------------------- configs
var paths = {
    sass: {
        src: 'sass/*.scss',
        comp: 'sass/style.scss',
        dest: './'
    },
    js: {
        src: ['js/source/**/!(main)*.js', 'js/source/main.js'],
        dest: 'js'
    }
};

// ---------------------------------------------- Gulp Tasks
gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(notify('Sass task complete.'))
});

gulp.task('scripts', function () {
    return gulp.src(paths.js.src)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(notify({
            message: 'Scripts task complete'
        }));;
});

// ---------------------------------------------- Gulp Watch
gulp.task('watch:styles', function () {
    gulp.watch(paths.sass.src, gulp.series('sass'));
});

gulp.task('watch:scripts', function () {
    gulp.watch(paths.js.src, gulp.series('scripts'));
});

gulp.task('watch', gulp.parallel(
    gulp.series('sass', 'watch:styles'),
    gulp.series('scripts', 'watch:scripts')
));

// -------------------------------------------- Default task
gulp.task('default',
    gulp.parallel('sass', 'scripts'),
    gulp.series('watch')
);
