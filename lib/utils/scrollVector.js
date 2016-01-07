var vec = require('geo/Vector')();

module.exports = function () {
    vec.x = window.scrollX;
    vec.y = window.scrollY;
    return vec;
};