'use strict';

const gulp          = require('gulp');
const clean          = require('gulp-clean');
const watch          = require('gulp-watch');
const plumber       = require('gulp-plumber');
const gulpif        = require('gulp-if');

/*styles*/
const less          = require('gulp-less');
const autoprefixer  = require('gulp-autoprefixer');
const csso          = require('gulp-csso');

/*js*/
const babel         = require('gulp-babel');
const uglify        = require('gulp-uglify-es').default;


const IsDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV ==='development';

const SRC = '.';
const DIST = '../static';


gulp.task('styles', () => {
    return gulp.src(`${SRC}/styles/**/[^_]*.less`)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer(['last 50 versions']))
        .pipe(gulpif(!IsDevelopment, csso({
            restructure: true,
            sourceMap: true,
            debug: true
        })))
        .pipe(gulp.dest(`${DIST}/css`));
});

gulp.task('js', () => {
    return gulp.src(`${SRC}/js/**/*.js`)
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulpif(!IsDevelopment, uglify()))
        .pipe(gulp.dest(`${DIST}/js`));
});

gulp.task('clean', () => {
    return gulp.src([`${DIST}/js/**/*.js`, `${DIST}/css/**/*.css`], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('watch', () => {
    watch(`${SRC}/styles/**/[^_]*.less`, gulp.series('styles'));
    watch(`${SRC}/js/**/*.js`, gulp.series('js'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('js', 'styles', 'watch')));
gulp.task('prod', gulp.series('clean', gulp.parallel('js', 'styles')));
