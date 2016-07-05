'use strict';

module.exports = function (obj) {
    if (typeof obj !== 'object') return false;
    
    var i=0, p;
    for(p in obj) ++i;
    return i===0;
};
