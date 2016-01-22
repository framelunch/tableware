module.exports = function (a, b) {
    b = b || document;
    return a.querySelector(b);
};
