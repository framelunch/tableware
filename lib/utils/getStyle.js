'use strict';

module.exports = function (elm, s) {
    console.log(elm);
    var v = elm.style[s];
    if (!v) {
        v = window.getComputedStyle(elm, '').getPropertyValue(s) || '';
    }
    return /^(top|bottom|left|right|width|height|opacity)$/.test(s) ? parseFloat(v) : v;
};
