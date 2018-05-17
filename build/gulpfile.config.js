// 安装  cnpm install --save-dev gulp babel-core babel-preset-es2015 gulp-babel browser-sync del gulp-autoprefixer gulp-clean-css gulp-concat gulp-cssnano gulp-imagemin gulp-jshint gulp-livereload gulp-notify gulp-plumber gulp-rename gulp-rev-append gulp-rimraf gulp-sass gulp-uglify jshint mkdirp     
//还需要全局安装rimraf，  cnpm install -g rimraf
var SRC_DIR = './src/wwwroot/';     // 源文件目录  
var DIST_DIR = './dist/';   // 文件处理后存放的目录  
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    html: {  
        dir: SRC_DIR,
        src: SRC_DIR + 'html/*.html',  
        dist: DIST_DIR + 'html'
    },  
    assets: {  
        dir: SRC_DIR + 'assets',
        src: SRC_DIR + 'assets/**/*',            // assets目录：./src/assets  
        dist: DIST_DIR + 'assets'                // assets文件build后存放的目录：./dist/assets  
    },  
    public: {  
        dir: SRC_DIR + 'public',
        src: SRC_DIR + 'public/*',            // public目录：./src/public  
        dist: DIST_DIR + 'public'                      // public文件build后存放的目录：./dist/public  
    },  
    css: {  
        dir: SRC_DIR + 'css',
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/  
        dist: DIST_DIR + 'css'                   // CSS文件build后存放的目录：./dist/css  
    },  
    sass: {  
        dir: SRC_DIR + 'sass',
        src: SRC_DIR + 'sass/**/*.scss',         // SASS目录：./src/sass/  
        dist: DIST_DIR + 'css'                   // SASS文件生成CSS后存放的目录：./dist/css  
    },  
    js: {  
        dir: SRC_DIR + 'js',
        src: SRC_DIR + 'js/**/*.js',             // JS目录：./src/js/  
        dist: DIST_DIR + 'js',                   // JS文件build后存放的目录：./dist/js  
        build_name: 'build.js'                   // 合并后的js的文件名  
    },  
    es6: {
        dir: SRC_DIR + 'js',
        src: SRC_DIR + 'js/**/*.es6',  
        dist: DIST_DIR + 'js',
    },
    img: {  
        dir: SRC_DIR + 'images',
        src: SRC_DIR + 'images/**/*.{png,jpg,gif,ico}',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    },
    json: {
        dir: SRC_DIR + 'json',
        src: SRC_DIR + 'json/*.json',  
        dist: DIST_DIR + 'json',
    } 
};

module.exports = Config;