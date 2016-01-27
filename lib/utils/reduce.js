module.exports = function (col, func, res) {
    for(var p in col) {
        func(res, col[p], p);
    }
    return res;
};
