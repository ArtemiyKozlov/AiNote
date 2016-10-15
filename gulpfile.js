var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task('scripts', function () {
    return gulp.src(["src/**/*.ts", "./typings/**/*.d.ts"])
        .pipe(ts({
            noImplicitAny: false,
            module: "commonjs"
        }))
        .pipe(gulp.dest("bin/"));
});

var confFilesToMove = [
    './src/server/configuration/*.json'
];

gulp.task('move', function() {
    gulp.src(confFilesToMove, { base: 'src/' })
        .pipe(gulp.dest('bin/'));
});

gulp.task('watch', ['scripts', 'move'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('./src/server/configuration/*.json', ['move']);
});
