'use strict';

var 
    each = require('./each'),
    search = function (col, keyword, name) {
        if (typeof col === 'object') {
            if (name) {
                return search(col[name], keyword);
            } else {
                var bool, p;
                for(p in col) {
                    bool = search(col[p], keyword);
                    if (bool) return true;
                }
                return false;
            }
        } else {
            return col === keyword;
        }
    };

module.exports = function (col, keyword, name) {
    if (typeof col === 'object') {
        var p, bool, item;
        for(p in col) {
            item = col[p];
            bool = search(item, keyword, name);
            if (bool) return item;
        }
        return null;    
    } else {
        if (col === keyword) {
            return col;
        } else {
            return null;
        }
    }
    
};
