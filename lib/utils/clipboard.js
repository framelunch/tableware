'use strict';

module.exports = function (value) {
    var input = document.createElement('input');
    input.value = value;
    document.body.appendChild(input);
    input.select();

    document.execCommand('copy');
    document.body.removeChild(input);
};
