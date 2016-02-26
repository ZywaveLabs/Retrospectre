/*eslint-disable */
var gulp = require("gulp");
var eslint = require("gulp-eslint");
var shell = require("gulp-shell");

gulp.task("lint", function() {
    return gulp.src(["src/**/*.js", "!src/**/sample/**/*.js", "!src/tests/**/*.js", "!src/**/*.min.*", "!src/public/**/*.js"])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


gulp.task("bash", function() {
    return gulp.src("*.js", {read: false})
    .pipe(shell([
        "echo \"This task is not setup yet, go away\"",
    ]));
});
