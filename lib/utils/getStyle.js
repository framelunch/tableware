module.exports = function (elm, s) {
    var v = window.getComputedStyle(elm, '').getPropertyValue(s);
    return /top|bottom|left|right|width|height/.test(s) ? parseFloat(v) : v;
};
