'use strict';

var
    set = require('../utils/set'),
    isEmpty = require('../utils/isEmpty'),

    Owin = function (w) {
        this[0] = w;
        this.length = 1;
    };

Owin.prototype = {
    init: function (val) {
        if (val) {
            set(this, val);
        }
    },
    scrollTop: function (val) {
        if (isEmpty(val)) {
            return this[0].scrollY;
        } else {
            this[0].scrollTo(this[0].scrollX, val);
        }
    },
    scrollLeft: function (val) {
        if (isEmpty(val)) {
            return this[0].scrollX;
        } else {
            this[0].scrollTo(val, this[0].scrollY);
        }
    },
    width: function () {
        return this[0].innerWidth;
    },
    height: function () {
        return this[0].innerHeight;
    },
    on: function (key, func) {
        this[0].addEventListener(key, func);
    },
    off: function (key, func) {
        this[0].removeEventListener(key, func);
    }
};
module.exports = Owin;