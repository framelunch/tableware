'use strict';

module.exports = function(v, len)
{
    if(v===null||v===undefined){ v = 0; }
    if(len===null||len===undefined){ len = 2; }
    var s = v.toString(),
        i = 0,
        l = len-s.length;

    if(l>0){
        for(i; i<l; i++){ s = '0'+s; }
    }
    return s;
};
