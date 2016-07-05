'use strict';

exports['tw-disabled'] = function (temp, item) {
    var key = item.getAttribute('tw-disabled'),
        a, b;
    if (key.charAt(0) === '!') {
        key = key.substr(1);
        a = function () { item.removeAttribute('disabled'); };
        b = function () { item.setAttribute('disabled', 'disabled'); };
    } else {
        a = function () { item.setAttribute('disabled', 'disabled'); };
        b = function () { item.removeAttribute('disabled'); };
    }

    return function () {
        temp.get(key) ? a() : b();
    };
};
exports['tw-show'] = function (temp, item) {
    var key = item.getAttribute('tw-show'),
        a, b;
    if (key.charAt(0) === '!') {
        key = key.substr(1);
        a = 'none';
        b = null;
    } else {
        a = null;
        b = 'none';
    }

    return function () {
        if (temp.get(key)) {
            item.style.display = a;
        } else {
            item.style.display = b;
        }
    };
};