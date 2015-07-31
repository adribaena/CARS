
'use strict';

var gulp = require('gulp');
// var $ = require('gulp-load-plugins')();
// var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var spawn = require('child_process').spawn;
var node;

// app server address (i.e. "localhost" or 0.0.0.0)
var serverAddress = "localhost";
// app server port, should be different from Browser Sync port (bsPort)
var serverPort = 1337;
// node app file relative path (i.e. "backend/app.js")
var appFileRelPath = "."; // default to "." so node looks package.json main indications
// port to run Browser Sync, shoub different 
var bsPort = 8080 ;
// Browsers to load Broswer Sync (i.e. ["google chrome canary", "Firefox"])
var browsers = ["google chrome canary"]; 
// Files to watch for node reloading (i.e. ['server/**/*.js', 'server/*.js'])
var nodeFilesToWatch = [
    'app.js',
    'api/**/*.js',
    'assets/**/*',
    'assets/**/**/*',
    'assets/**/**/**/*',
    'config/*.js',
    'config/**/*',
    'task/**/*',
    'task/*.js'
    ];
// Files to watch for browser reloading (i.e. ['client/**/*.js', 'dist/*.html','app/styles/**/*.{scss,css}'])
var clientFilesToWatch = [
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
 ];


// (load || reload) node
gulp.task('node', function() {
    // if node is already running
    if (node) node.kill();
    //run node
    node = spawn('node', [ appFileRelPath ], {stdio: 'inherit'});
    node.on('close', function (code) {
      if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    });
});


// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});


// starts node the browser sync
gulp.task('browserSync-start', ['node'], function() {
    browserSync.init({
        // Brwoser Sync acts as proxy of the server running in server address
        proxy: serverAddress + ':' + serverPort ,
        port:  bsPort ,
        browser: browsers
    });
});

// reload browserSync
gulp.task('browserSync-reload', function(){
  browserSync.reload();
});

// watch for changes in node and js-app related files. reload node and/or browser if needed
gulp.task('watch', function() {

  gulp.watch(nodeFilesToWatch, ['node']);
  gulp.watch(clientFilesToWatch, ['browserSync-reload']);
  
});

// run browserSync-start(which first starts node task) and begins watching for changes
gulp.task('default', ['browserSync-start', 'watch'], function () {
  // runSequence('browserSync-start');
});