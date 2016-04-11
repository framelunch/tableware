'use strict';

module.exports = function (a, b) {
    b = b || document;
    return a.querySelectorAll(b);
};
