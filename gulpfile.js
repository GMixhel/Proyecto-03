const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const webp = require('gulp-webp');


function css(done) {
    src("src/scss/app.scss")
        .pipe(plumber())
        .pipe(sass())        
        .pipe(dest("build/css"));
    done();
}

function versionWebp (done) {
    const options = {
        quality: 100
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'))

    done();
}


function javascript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));    
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.js = javascript;
exports.dev = parallel(javascript, dev, versionWebp);