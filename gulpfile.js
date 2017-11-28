var gulp = require('gulp');
var path = require('path');
const shell = require('gulp-shell');
gulp.task('upload', () => {
  gulp.src('')
    .pipe(shell([
        'scp /dist root @http://47.92.112.44:/opt/test'
    ]));
})