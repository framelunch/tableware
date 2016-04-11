'use strict';

module.exports = function(v, s1, s2)
{
    var s = '',
        a = v.split(s1),
        i = 0,
        l = a.length;

    for(i; i<l; i++){
        s += a[i];
        if(i!==l-1){ s += s2; }
    }
    return s;
};