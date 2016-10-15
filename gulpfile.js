var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function () {
    var tsResult = gulp.src(["src/**/*.ts", "./typings/**/*.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: false,
            module: "commonjs"
        }));

    return tsResult.js
        .pipe(sourcemaps.write('./sourceMaps'))
        .pipe(gulp.dest('bin/'));
});

var confFilesToMove = [
    './src/server/configuration/*.json'
];

gulp.task('move', function() {
    return gulp.src(confFilesToMove, { base: 'src/' })
        .pipe(gulp.dest('bin/'));
});

gulp.task('watch', ['scripts', 'move'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('./src/server/configuration/*.json', ['move']);
});

gulp.task('default', ['watch']);
