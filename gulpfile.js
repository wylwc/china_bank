var gulp = require("gulp");
var webserver = require("gulp-webserver");
// var mock = require("mockjs");
var fs = require("fs");
var path = require("path");

var concat = require('gulp-concat');
// css
var minifyCss = require('gulp-minify-css');
// js
// var uglify = require("gulp-uglify");//错


// 压缩css
gulp.task("minifyCss",function(){
    gulp.src("./css/style.css")
    .pipe(concat("re_style.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest("./css"))
})
// 压缩js
// gulp.task("minifyJs",function(){
//     gulp.src("./gulpfile.js")
//     .pipe(concat("memeda.js"))
//     .pipe(uglify())
//     .pipe(gulp.dest("./js"))
// })

gulp.task("webserver",function(){
    gulp.src("./")
    .pipe(webserver({
        host:"localhost",
        port:8000,
        open:true,
        fallback:"index.html",
        livereload:true
    }));
})
gulp.task("list",function(){
    gulp.src("./")
    .pipe(webserver({
        host:"localhost",
        port:9999,
        middleware:function(req,res,next){
            res.writeHead(200,{
                "content-type":"text/json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            })
            if(req.url === "/indexHtml"){
                var filename = req.url.split("/")[1];
                // var dataFile = path.join(__dirname,"data",filename + ".json");
                fs.exists("./data/list.json",function(exist){
                    console.log(exist)
                    if(exist){
                        fs.readFile("./data/list.json",function(err,data){
                            console.log(err)
                            if(err){
                                throw err;
                            }else{
                                res.end(data);
                            }                           
                        })
                    }else{
                        var data = "can't found this file " + filename;
                        res.end(data) 
                    }
                })
            }
            next();
        }
    }));
})
gulp.task("default",function(){
    gulp.start("webserver")
})