var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀  
    rename = require('gulp-rename'), //重命名  
    cssnano = require('gulp-cssnano'), // css的层级压缩合并
    cleanCss = require('gulp-clean-css'),  //css压缩
    sass = require('gulp-sass'), //sass
    jshint = require('gulp-jshint'), //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  gulp-jshint和jshnt要一起下载，安装。 
    uglify = require('gulp-uglify'), //js压缩  
    plumber = require('gulp-plumber'),//任务出错继续执行不会中断
    babel = require('gulp-babel'), //编译es6
    concat = require('gulp-concat'), //合并文件  
    imagemin = require('gulp-imagemin'), //图片压缩 
    livereload = require('gulp-livereload'), // 热加载
    Config = require('./gulpfile.config.js');
//======= gulp build 打包资源 ===============
function prod() {
    /** 
     * HTML处理 
     */
    gulp.task('html', () => {
        return gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dist))
            .pipe(livereload());
    });
    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets', () => {
        return gulp.src(Config.assets.src)
            .pipe(gulp.dest(Config.assets.dist));
    });
    /** 
     * Public文件处理 
     */
    gulp.task('public', () => {
        return gulp.src(Config.public.src)
            .pipe(gulp.dest(Config.public.dist))
            .pipe(livereload());
    });
    /** 
     * SASS样式处理 
     */
    gulp.task('sass', () => {
        return gulp.src(Config.sass.src)
            .pipe(plumber())
            .pipe(sass())
            .pipe(cleanCss({
                format: 'beautify'
            }))
            .pipe(gulp.dest(Config.css.dir))
            .pipe(livereload());
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css', () => {
        return gulp.src(Config.css.src)
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(cleanCss({    
                compatibility: 'ie7'    //保留ie7及以下兼容写法
            }))    
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(livereload());
    });
    /** 
     * es6编译 
     */
    gulp.task('babel', () => {
        return gulp.src(Config.es6.src)
            .pipe(plumber())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(rename( (path) => {
                path.extname = '.js'
            }))
            .pipe(gulp.dest(Config.es6.dir))
            .pipe(livereload());
    })
    /** 
     * js处理 
     */
    gulp.task('js', () => {
        return gulp.src(Config.js.src)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest(Config.js.dist))
            .pipe(livereload());
    });
    /** 
     * 合并所有js文件并做压缩处理 
     */
    gulp.task('js-concat', () => {
        return gulp.src(Config.js.src)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('build.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest(Config.js.dist))
            .pipe(livereload());
    })
    /** 
     * 图片处理 
     */
    gulp.task('images', () => {
        return gulp.src(Config.img.src)
            .pipe(imagemin({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(Config.img.dist));
    });
    /** 
     * json处理 
     */
    gulp.task('json', () => {
        return gulp.src(Config.json.src)
            .pipe(gulp.dest(Config.json.dist))
            .pipe(livereload());
    });


    gulp.task('build', ['html', 'css', 'public', 'sass', 'js', 'assets', 'images', 'babel', 'js-concat', 'json']);
    gulp.task("minify", ["css", "js", "sass", "babel"]);
}
module.exports = prod;