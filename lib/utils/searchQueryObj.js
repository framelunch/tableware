'use strict';

module.exports = function ()
{
    var obj = {},
        arr = window.location.search.slice(1).split('&'),
        i = 0, l = arr.length, item;

    if (!arr[0]) return obj;
    
    for(i; i<l; i++) {
        item = arr[i].split('=');
        obj[item[0]] = item[1];
    }
    return obj;
};
