'use strict';

var vec = require('../geo/Vector')(),
    def = function () {
        vec.x = window.scrollX;
        vec.y = window.scrollY;
        return vec;
    },

    elm = document.documentElement,
    forWin = function () {

        vec.x = elm.scrollLeft;
        vec.y = elm.scrollTop;
        return vec;
    };

module.exports = window.scrollX === undefined ? forWin : def;