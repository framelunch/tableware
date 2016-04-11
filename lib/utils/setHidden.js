'use strict';

module.exports = function (elm, bool) {
    if (!elm.__hidden__) {
        var v = window.getComputedStyle(elm, '').getPropertyValue('display');
        elm.__hidden__ = v === 'none' ? 'block' : v;
    }
    elm.style.display = (bool ? 'none' : elm.__hidden__);
};
