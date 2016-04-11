'use strict';

module.exports = function (to, from)
{
    var o1=to.prototype,
        o2=from.prototype;

    for(var p in o2){
        if(!(o1[p]===null || o1[p]===undefined)){ continue; }
        o1[p] = o2[p];
    }
    return to;
};