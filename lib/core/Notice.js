'use strict';

var
    Cp = require('./Cp'),
    Note;

Note = function () {
    this.cps = {};
};
Note.prototype = {
    listen: function (key, func) {
        var c = this.cps[key];
        if (!c) {
            c = this.cps[key] = Cp();
        }
        c.add(func);
        return func;
    },
    clear: function (key, func) {
        var c = this.cps[key];
        if (!c) { return; }
        c.remove(func);
    },
    publish: function (key, obj) {
        var c = this.cps[key];
        if (!c) { return; }
        c.update(obj);
    },
    release: function () {
        var p;
        for (p in this.cps) {
            this.cps[p].release();
        }
        delete this.cps;
    }
};

module.exports = function () {
    return new Note();
};