'use strict';

module.exports = function (obj) {
    var a = [], p;
    for(p in obj) {
        a.push(p);
    }
    return a;
};
