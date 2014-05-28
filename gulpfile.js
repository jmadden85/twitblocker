var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', funtion () {
    nodemon({script: 'server.js', ext: 'html js', ignore: ['ignored.js']})
        .on('restart', function () {
            console.log('restarted!');
        })
});