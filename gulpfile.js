'use strict';

var gulp = require('gulp');
var url = require('url');
var opn = require('opn');
var proxy = require('proxy-middleware');
var browserSync = require("browser-sync");

var server = {
    host: 'localhost',
    port: '8444'
};

gulp.task('default', ['browser-sync', 'openbrowser']);

gulp.task('local-live', ['browser-sync-live']);

gulp.task('openbrowser', function() {
    opn('https://' + server.host + ':' + server.port + '/index.html#/home');
});

gulp.task('browser-sync', function() {
    var meddiagProxyOptions = url.parse('http://localhost:8080/medical-diagnosis-integration');
    meddiagProxyOptions.route = '/medical-diagnosis-integration';

    browserSync({
        open: false,
        port: server.port,
        https: true,
        server: {
            baseDir: './src/',
            middleware: [proxy(meddiagProxyOptions)]
        }
    });
});

gulp.task('browser-sync-live', function() {
    var meddiagProxyOptions = url.parse('http://localhost:8080/medical-diagnosis-integration');
    meddiagProxyOptions.route = '/medical-diagnosis-integration';

    browserSync({
        open: false,
        port: '80',
        https: true,
        server: {
            baseDir: './src/',
            middleware: [proxy(meddiagProxyOptions)]
        }
    });
});