'use strict';

module.exports = function () {
    var lang = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage);
    if (lang.substr(0,2) === 'ja') {
        return 'ja';
    } else {
        return 'en';
    }
};