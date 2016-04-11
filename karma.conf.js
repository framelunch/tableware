'use strict';

var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'test/_spec.js'
        ],
        exclude: [],
        preprocessors: {
            'test/_spec.js': ['webpack', 'sourcemap'],
            '.tmp/**/*.html': ['html2js']
        },
        webpack: {
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules|test/,
                        loader: "eslint-loader"
                    }
                ]
            },
            eslint: {
                configFile: '.eslintrc'
            },
            resolve: {
                root: [
                    path.join(process.cwd(), '/lib')
                ]
            },
            devtool: 'inline-source-map'
        },
        webpackMiddleware: {
            noInfo: true
        },
        colors: true,
        logLevel: config.LOG_INFO
    });
};