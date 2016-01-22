var
    merge = require('../utils/merge'),
    degree = require('../utils/degree'),

    ease = require('./easing'),
    Tween = require('./Tween'),
    To = require('./To'),
    Serial = require('./Serial'),
    Parallel = require('./Parallel'),
    Delay = require('./Delay'),
    Func = require('./Func'),
    main = function (tar, to, time, ease) {
        if (time) {
            return new Tween(tar, to, null, time, ease).play();
        } else {
            return new To(tar, to).play();
        }
    };

main.to = function (tar, to, time, ease) {
    if (time) {
        return new Tween(tar, to, null, time, ease);
    } else {
        return new To(tar, to);
    }
};
main.tween = function (tar, to, from, time, ease) { return new Tween(tar, to, from, time, ease); };
main.from = function (tar, from, time, ease) { return new Tween(tar, null, from, time, ease); };
main.serial = function () { return new Serial(arguments); };
main.parallel = function () { return new Parallel(arguments); };
main.delay = function (tw, delay) { return new Delay(tw, delay); };
main.func = function (fc, args) { return new Func(fc, args); };

main.pause = function () {
    var i=arguments.length, a;
    for(i; i--;) {
        a = arguments[i];
        if (!a) { return; }
        if (a.status) { a.pause(); }
    }
};
main.end = function () {
    var i=arguments.length, a;
    for(i; i--;) {
        a = arguments[i];
        if (!a) { return; }
        if (a.status) { a.end(); }
    }
};

main.degree = degree;
module.exports = merge(main, ease);