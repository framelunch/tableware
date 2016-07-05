'use strict';

var
    prim = function (item, key) {
        return item === key;
    },
    obj = function (item, key) {
        for(var p in key) {
            if (item[p] !== key[p]) {
                return false;
            }
        }
        return true;
    },
    match = function (col, key) {
        var p, item, ev=(typeof key === 'object') ? obj : prim;
        for (p in col) {
            item = col[p];
            if (ev(item, key)) {
                return item;
            }
        }
        return null;
    };

module.exports = match;
