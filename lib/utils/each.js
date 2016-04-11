'use strict';

module.exports = function (col, func) {
    if(Array.isArray(col)) {
        for(var i= 0, l=col.length; i<l; i++) {
            func(col[i], i, col);
        }
    } else {
        for(var p in col) {
            func(col[p], p, col);
        }
    }
};
