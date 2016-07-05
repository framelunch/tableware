'use strict';

var 
    dateFormat = require('../utils/dateFormat'),
    strOfNum = require('../utils/strOfNum'),
    strOfTime = require('../utils/strOfTime'),
    strOfFigure = require('../utils/strOfFigure')
    ;

exports.date = function (value, format) {
    return dateFormat(value, format);
};
exports.number = function (value, len) {
    return strOfNum(value, len);
};
exports.time = function (value, len) {
    return strOfTime(value, len);
};
exports.figure = function (value) {
    return strOfFigure(value);
};
