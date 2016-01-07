module.exports = function ()
{
    var obj = {},
        arr = window.location.hash.slice(1).split('&'),
        i = 0, l = arr.length, item;

    for(i; i<l; i++) {
        item = arr[i].split('=');
        obj[item[0]] = item[1];
    }
    return obj;
};