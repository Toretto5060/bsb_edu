var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀  
    rename = require('gulp-rename'), //重命名  
    cssnano = require('gulp-cssnano'), // css的层级压缩合并
    cleanCss = require('gulp-clean-css'),  //css压缩
    sass = require('gulp-sass'), //sass
    jshint = require('gulp-jshint'), //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1） gulp-jshint和jshnt要一起下载，安装。 
    uglify = require('gulp-uglify'), //js压缩  
    plumber = require('gulp-plumber'),//任务出错继续执行不会中断
    babel = require('gulp-babel'), //编译es6
    concat = require('gulp-concat'), //合并文件  
    imagemin = require('gulp-imagemin'), //图片压缩 
    browserSync = require('browser-sync').create(),  //浏览器同步
    reload = browserSync.reload,  // 自动刷新
    Config = require('./gulpfile.config.js');

//======= gulp dev 开发环境下 ===============

function dev() {
    /** 
     * HTML处理 
     */
    gulp.task('html:dev', () => {
        return gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets:dev', () => {
        return gulp.src(Config.assets.src)
            .pipe(gulp.dest(Config.assets.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * Public文件处理 
     */
    gulp.task('public:dev', () => {
        return gulp.src(Config.public.src)
            .pipe(gulp.dest(Config.public.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css:dev', () => {
        return gulp.src(Config.css.src)
            .pipe(gulp.dest(Config.css.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * SASS样式处理 
     */
    gulp.task('sass:dev', () => {
        return gulp.src(Config.sass.src)
            .pipe(sass())
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * es6编译 
     */
    gulp.task('babel:dev', () => {
        return gulp.src(Config.es6.src)
            .pipe(babel({   
                presets: ['es2015']
            }))
            .pipe(gulp.dest(Config.es6.dist))
            .pipe(reload({
                stream: true
            }));
    })
    /** 
     * js处理 
     */
    gulp.task('js:dev', () => {
        return gulp.src(Config.js.src)  
            .pipe(jshint('.jshintrc'))  // 对js进行检查
            .pipe(jshint.reporter('default'))   // 对代码进行报错提示
            .pipe(gulp.dest(Config.js.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * 图片处理 
     */
    gulp.task('images:dev', () => {
        return gulp.src(Config.img.src)
            .pipe(imagemin({
                optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true,      //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true        //类型：Boolean 默认：false 隔行扫描gif进行渲染
            }))
            .pipe(gulp.dest(Config.img.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * json处理 
     */
    gulp.task('json:dev', () => {
        return gulp.src(Config.json.src)
            .pipe(gulp.dest(Config.json.dist))
            .pipe(reload({
                stream: true
            }));
    });


    gulp.task('dev', ['html:dev', 'public:dev', 'css:dev', 'sass:dev', 'js:dev', 'assets:dev', 'images:dev','babel:dev','json:dev'], () => {
        browserSync.init({     //架设静态服务器
            files:['**'],
            server: {
                baseDir: Config.src,    // 设置服务器的根目录
                index: 'home.html'                // 指定默认打开的文件
            },
            // notify: false
        });
        // Watch .html files  
        gulp.watch(Config.html.src, ['html:dev']);
        // Watch .Public files  
        gulp.watch(Config.public.src, ['public:dev']);
        // Watch .css files  
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files  
        gulp.watch(Config.sass.src, ['sass:dev']);
        // Watch assets files  
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files  
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files  
        gulp.watch(Config.img.src, ['images:dev']);
        // Watch es6 files  
        gulp.watch(Config.es6.src, ['babel:dev']);
        // Watch json files  
        gulp.watch(Config.json.src, ['json:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;