module.exports = function (a, b) {
    var obj = {};
    for(var par in a) {
        obj[par] = a[par] - b[par];
    }
    return obj;
};
