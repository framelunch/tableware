'use strict';

module.exports = function (col, func, res) {
    if (Array.isArray) {
        for(var i= 0, l=col.length; i<l; i++) {
            func(res, col[i], i);
        }
    } else {
        for(var p in col) {
            func(res, col[p], p);
        }
    }
    return res;
};
