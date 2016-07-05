'use strict';

var each = require('./each'),
    isEmpty = require('./isEmpty');

module.exports = function (col, key) {
    var arr = [];
    each(col, function (item) {
        if (!isEmpty(item = item[key])) arr.push(item);
    });
    return arr;
};
