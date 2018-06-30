const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');


//Compile Sass
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
});

//Minify JS 
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
});

//Watch JS
gulp.task('js-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

//Copy HTML task
gulp.task('copyHtml', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

//Copy Fonts
gulp.task('fonts', function() {
    return gulp.src('src/fonts/*.ttf')
        .pipe(gulp.dest('dist/fonts'))
});

//Optimize images 
gulp.task('images', function() {
    return gulp.src('src/images/*.jpg')
        .pipe(imagemin([
            imagemin.jpegtran(),
            imageminJpegRecompress()
        ]))
        .pipe(gulp.dest('dist/images'))
});

//Optimize icons
gulp.task('icons', function() {
    return gulp.src('src/icons/**/*.svg')
        .pipe(imagemin([
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('dist/icons'))
});

//Watch and serve
gulp.task('serve', ['fonts', 'icons', 'images', 'sass', 'copyHtml', 'scripts'], function() {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']).on('change', browserSync.reload);
    gulp.watch('src/scripts', ['js-watch'])
});

gulp.task('default', ['serve']);

