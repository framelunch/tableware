module.exports = function (col, func) {
    for(var p in col) {
        func(col[p], p, col);
    }
};
