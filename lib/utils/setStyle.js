module.exports = function (elm, val) {
    for(var p in val) {
        elm.style[p] = val[p] +
            (/top|bottom|left|right|width|height/.test(p) ? 'px' : '');
    }
};
