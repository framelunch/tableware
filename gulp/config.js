'use strict';

var
    _ = require('lodash'),
    path = require('path'),
    current = process.cwd();

module.exports = {
    dest: {
        dev: '.tmp',
        dist: '_dist',
        build: {
            client: 'build'
        }
    },
    copy: {
        assets: ['assets/**/*', '!assets/img/_sprite', '!assets/img/_sprite/**/*']
    },

    replace: {
        match: /(\/client)+/g,
        to: ''
    },

    sprite: {
        src: ['client/assets/img/_sprite/*.png'],
        option: {
            imgName: '_sprite.png',
            cssName: '_sprite.scss',
            imgPath: '/assets/img/_sprite.png',
            cssFormat: 'scss',
            cssVarMap: function (sprite) {
                sprite.name = 'sprite-' + sprite.name;
            }
        },
        dest: {
            img: 'assets/img',
            css: 'common'
        }
    },

    ejs: {
        src: ['ejs/**/*.ejs', '!ejs/**/_*'],
        rename: function (path) {
            if (path.basename !== 'index') {
                path.dirname = _.reduce(path.basename.split('.'), function (str, item) {
                    str += item + '/';
                    return str;
                }, '');
                path.basename = 'index';
            }
        }
    },

    sass: {
        src: ['sass/**/*.scss']
    },

    bower: {

    },

    js : {
        src: ['js/*.js'],
        rename: {
            normal:function (path) {
                path.dirname = _.reduce(path.basename.split('.'), function (str, item) {
                    str += item + '/';
                    return str;
                }, '');
            },
            min: function (path) {
                path.dirname = _.reduce(path.basename.split('.'), function (str, item) {
                    str += item + '/';
                    return str;
                }, '');
                path.basename = path.basename + '.min';
            }
        }
    },

    webpack: {
        entry: {},
        output: {
            filename: '[name].js',
            sourceMapFilename: '[name].map'
        },
        resolve: {
            root: [
                path.join(current, '/lib'),
                path.join(current, '/components')
            ],
            extensions: ['', '.js']
        },
        module: {
            loaders: [
                { test: /\.html$/, loader: 'html-loader' }
            ]
        }
    },
    webpackOption: {
        dev: {
            entry: {'_spec': './test/_spec.js'},
            cache: true,
            debug: true,
            devtool: '#source-map'
        },
        dist: {
            cache: false,
            debug: false,
            devtool: ''
        },
        build: {
            cache: false,
            debug: false,
            devtool: ''
        }
    },

    eslint: {
        src: ['lib/**/*.js'],
        option: {
            configFile: '.eslintrc'
        }
    },
    
    watch: {
        ejs: ['ejs/**/*.ejs', 'common/**/*.ejs', 'components/**/*.ejs'],
        sass: ['sass/**/*.scss', 'common/**/*.scss', 'components/**/*.scss', 'lib/**/*.scss'],
        js: ['js/**/*.js', 'lib/**/*.js', 'components/**/*.js', 'components/**/*.html']
    },

    browser: {
        notify: false,
        port: 9990,
        server: {
            baseDir: [".tmp"],
            routes: {
                '/assets': 'assets',
                '/data': 'data'
            }
        }
    },

    jsdoc: {
        src: ['README.md', 'lib/**/*.js'],
        config: {
            opts: {
                "encoding": "utf8",
                "destination": "docs/",
                "recurse": true
            }
        }
    }
};
