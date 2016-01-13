'use strict';

var
    Cp = require('./Cp'),
    _get, _set, Kvs;

_get = function (data, p) {
    if (p.length>1) {
        return _get(data[p[0]], p.splice(1));
    }
    else {
        return data[p[0]];
    }
};

_set = function(d, p, t, v){
    if (typeof(t[v]) === 'function') {
        if (p) {
            t[v].call(t, _get(d, p.split('.')));
        } else {
            t[v].call(t, d);
        }
    } else {
        if (p) {
            t[v] = _get(d, p.split('.'));
        } else {
            t[v] = d;
        }
    }
};

Kvs = function () {
    this.data = {};
    this.cps = {};
};
Kvs.prototype = {
    set: function (key, value) {
        if (key && value) {
            this.data[key] = value;
            if (this.cps[key]) {
                this.cps[key].update([value]);
            }
        }
    },
    get: function (key) {
        var arr, p, value;
        arr = key.split(' ');
        key = arr[0];
        p = arr[1];

        if (p) {
            value = _get(this.data[key], p.split('.'));
        } else {
            value = this.data[key];
        }
        return value;
    },
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
    bind: function (key, target, name) {
        var
            arr = key.split(' '),
            value = this.data[key = arr[0]],
            cps = this.cps,
            bind, func;

        if (value) {
            _set(value, arr[1], target, name);
        } else {
            bind = target.__kvsbind__;

            if (bind) {
                func = bind[key];
                if (func) {
                    cps[key].dispose(func);
                }
            } else {
                bind = target.__kvsbind__ = {};
            }

            func = bind[key] = function (value) {
                _set(value, arr[1], target, name);
                cps[key].dispose(func);
                bind[key] = null;
            };

            if (cps) {
                cps[key] = Cp();
            }
            cps[key].add(func);
        }
    }
};

module.exports = function () {
    return new Kvs();
};