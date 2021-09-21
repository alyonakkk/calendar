const path = {
    src: {
        scss: 'src/scss/style.scss',
        js: 'src/js/script.js',
        img: 'src/img/*.{png,jpeg,jpg,svg,gif}'
    },

    build: {
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/'
    },

    watch: {
        html: './index.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.{png,jpeg,jpg,svg,gif}'
    }
}

const { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileInclude = require('gulp-file-include'),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    mediaCss = require('gulp-group-css-media-queries'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src('./index.html')
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.scss)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 3 versions'],
                cascade: true
            })
        )
        .pipe(mediaCss())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function image() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], image)
}

let build = gulp.parallel(html, css, js, image)
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.image = image;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;