import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('deploy', ['default'], () => {
  return gulp.src('dist/**/*')
    .pipe($.ghPages());
});
