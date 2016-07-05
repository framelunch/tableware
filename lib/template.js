'use strict';

var Template = require('./template/Template');

module.exports = function (id) {
    return (new Template(id));
};
