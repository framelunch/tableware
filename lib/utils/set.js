'use strict';

var
    fcs = {
        'object' :function (tar, name, value) {
            main(tar[name], value);
        },
        'function' :function (tar, name, value) {
            tar[name].call(tar, value);
        },
        'string' :function (tar, name, value) {
            tar[name] = value;
        },
        'number' :function (tar, name, value) {
            tar[name] = value;
        }
    },
    main = function (tar, to) {
        var func, p;
        for(p in to) {
            func = fcs[typeof tar[p]] || fcs.string;
            func.call(this, tar, p, to[p]);
        }
    };

module.exports = main;
