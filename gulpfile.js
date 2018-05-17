
var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');

//======= gulp init 初始化项目结构 ===============

    /** 
     * 初始化项目结构
     */
    var gulp = require('gulp');
    var mkdirp = require('mkdirp');
    var Config = require('./build/gulpfile.config.js');
        gulp.task('init', function () {
            console.log(111);
            var dirs = [Config.html.dir, Config.assets.dir, Config.css.dir, Config.sass.dir, Config.js.dir, Config.img.dir, Config.es6.dir];
            dirs.forEach(dir => {
                mkdirp.sync(dir);
            });
        });
prod();
dev();