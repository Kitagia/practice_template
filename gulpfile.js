var { series, src, dest, watch, parallel } = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

function serve(cb) {
    browserSync.init({
        watch: true,
        server: {
            baseDir: './app'
        }
    })
    cb();
}

function compileSass() {
    return src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('app/css'))
}

function fileWatch(cb) {
    watch(['app/scss/**/*.scss'], parallel(compileSass));
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/css/**/*.css']).on('change', browserSync.reload);
}

exports.default = series(serve, compileSass, fileWatch);
