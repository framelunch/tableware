var vec = require('o/Vector')();

module.exports = function () {
    vec.x = window.scrollX;
    vec.y = window.scrollY;
    return vec;
};