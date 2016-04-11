// Karma configuration
// Generated on Sun Mar 27 2016 09:14:34 GMT+0900 (JST)

module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            '.tmp/**/*.html',
            //'.tmp/css/**/*.css',
            '.tmp/js/**/_spec.js',
            'test/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            '.tmp/js/**/*.js': ['sourcemap'],
            '.tmp/**/*.html': ['html2js']
        },
        colors: true,
        logLevel: config.LOG_INFO
    });
};
