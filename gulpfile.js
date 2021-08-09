
const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');

//compile, prefix, and min scss
function compilescss() {
  return src('src/scss/main.scss') 
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('dist/css')) 
};

// minify js
function jsmin(){
  return src('src/js/*.js') 
    .pipe(terser())
    .pipe(dest('dist/js')); 
}

//watchtask
function watchTask(){
  watch('src/scss/**/*.scss', compilescss); 
  watch('src/js/*.js', jsmin); 
}


// Default Gulp task 
exports.default = series(
  compilescss,
  jsmin,
  watchTask
);