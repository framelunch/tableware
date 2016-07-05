'use strict';

module.exports = function (v) {
    var num = new String(v).replace(/,/g, "");
    while(num !== (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
    return num;
};