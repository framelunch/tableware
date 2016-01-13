'use strict';
var
    cp = require('./Cp')(),
    time = require('utils/looptime'),
    id;

module.exports = {
    add: function (func) {
        cp.add(func);
        if (!id) {
            id = setInterval(function(){ cp.update(); }, time);
        }
        return func;
    },
    remove: function (func) {
        cp.remove(func);
        if (!cp.length) {
            clearInterval(id);
            id = null;
        }
    }
};