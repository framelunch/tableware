'use strict';

var Ajax = require('./core/Ajax');

module.exports = function (opt) {
    return Ajax().init(opt).send();
};
