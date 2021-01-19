/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import cachebust from 'gulp-cache-bust';
import del from 'del';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';
import merge from 'merge-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Lint JavaScript
gulp.task('lint', gulp.series(() =>
  gulp.src(['app/scripts/**/*.js', '!node_modules/**', 'app/faq.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
));

// Optimize images
gulp.task('images', gulp.series(() =>
  gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({ title: 'images' }))
));

// Copy all files at the root level (app)
gulp.task('copy', gulp.series(() => {
  let appfiles = gulp.src([
    'app/*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'copy' }));

  let datafiles = gulp.src([
    'app/data/*',
    'app/data/*/*'
  ]).pipe(gulp.dest('dist/data'));

  return merge(appfiles, datafiles);
}));

// Compile and automatically prefix stylesheets
gulp.task('styles', gulp.series(() => {
  const autoprefixer = require('autoprefixer');
  const cssnano = require('cssnano');
  const plugins = [
    autoprefixer(), // Uses browserlist from package.json https://github.com/browserslist/browserslist#readme
    cssnano()
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css'
  ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.postcss(plugins)))
    .pipe($.size({ title: 'styles' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('.tmp/styles'));
}));

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', gulp.series(() =>
  gulp.src([
    // Note: Since we are not using useref in the scripts build pipeline,
    //       you need to explicitly list your scripts here in the right order
    //       to be correctly concatenated
    './app/scripts/polyfills.js',
    './app/scripts/wst.js',
    './app/scripts/config.js',
    './app/scripts/lib/*.js',
    './app/scripts/sections/*.js',
    './app/scripts/main.js'
  ], {base: './app/scripts/'})
    .pipe($.newer('.tmp/scripts'))
    .pipe($.babel())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('main.min.js'))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe($.size({ title: 'scripts' }))
    .pipe(gulp.dest('./dist/scripts/'))
));

// Scan your HTML for assets & optimize them
gulp.task('html', gulp.series(() => {
  return gulp.src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: false
    }))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({ title: 'html', showFiles: true })))
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('dist'));
}));

// Clean output directory
gulp.task('clean', gulp.series(() => del(['.tmp', 'dist/*', '!dist/.git'], { dot: true })));

// Watch files for changes & reload
gulp.task('serve', gulp.series('scripts', 'styles', () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], gulp.series('styles', reload));
  gulp.watch(['app/scripts/**/*.js'], gulp.series('lint', 'scripts', reload));
  gulp.watch(['app/images/**/*'], reload);
}));

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', gulp.series(() => gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/scripts/sw'))));

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', gulp.series('copy-sw-scripts', () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/'
  });
}));

// Build production files, the default task
gulp.task('default', gulp.series('clean', 'styles', 'lint', 'scripts', 'images', 'html', 'copy', 'generate-service-worker'));

// Build and serve the output from the dist build
gulp.task('serve:dist', gulp.series('default', () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  })
));

gulp.task('deploy', gulp.series('default', () => {
  return gulp.src('dist/**/*')
    .pipe($.ghPages());
}));
