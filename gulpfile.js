const gulp = require('gulp');
const path = require('path');
const shell = require('gulp-shell');
gulp.task('upload', () => {
  gulp.src('')
    .pipe(shell([
        `scp -r ${path.resolve()}/dist root@47.92.112.44:/opt/test`
    ]));
})