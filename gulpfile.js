'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var spawn = require('child_process').spawn;
var node;
var  lr = require('tiny-lr');                   // liveReload
var http = require('http');                     // http io module
var path = require('path');                     // http io module




// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});


// reload node
gulp.task('node', function() {
    // if node is already running
    if (node) node.kill();
    //run node
    node = spawn('node', ['app.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
      if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    });
});


// run a live reload server
gulp.task('runLiveReloadServer', function () {
  // livereload server instance creation
  var lrServer = lr().listen(35729, function() {
    console.log('...LiveReload Listening on %s ...', 35729);
  });
});


// send reload signal to liverreload server
gulp.task('browserReload', function () {
  setTimeout(function() {
    // sends a request to liveReload server (then every site connected to liveReload 
    // server will refresh)
    http.get('http://localhost:35729/changed?files=file', function(res) {
      console.log("LiveReload server SUCCESS response to change:  " + res.statusCode);
    }).on('error', function(e) {
        console.log("Got error: LiveReload server ERROR response to change:  " + e.message);
      });
  }, 2000);
});


// watch for changes in node and js-app related files. reload node and/or browser if needed
gulp.task('default', ['runLiveReloadServer','node'], function() {

  gulp.watch([
    'app.js',
    'api/**/*.js',
    'assets/**/*',
    'assets/**/**/*',
    'assets/**/**/**/*',
    'config/*.js',
    'config/**/*',
    'task/**/*',
    'task/*.js'
  ], ['node']);

  gulp.watch([
    'assets/ng-app/*.html',
    'assets/ng-app/views/*.html',
    'assets/ng-app/*.html',
    'assets/ng-app/scripts/**/*.js',
    'assets/ng-app/styles/**/*',
    'assets/ng-app/styles/*',
    'assets/ng-app/assets/images/**/*',
    'assets/ng-app/assets/fonts/**/*',
    'task/**/*',
    'task/*.js'
    // '.tmp/fonts/**/*'
  ], ['browserReload']);
});