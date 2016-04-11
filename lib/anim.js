'use strict';

var
    reduce = require('./utils/reduce'),
    merge = require('./utils/merge'),

    ease = require('./anim/easing'),
    Tween = require('./anim/Tween'),
    To = require('./anim/To'),
    Serial = require('./anim/Serial'),
    Parallel = require('./anim/Parallel'),
    Delay = require('./anim/Delay'),
    Func = require('./anim/Func'),

    tw = function (tar, to, from, time, ease) {
        if (typeof tar === 'string') tar = document.querySelectorAll(tar);

        var Tw = Tween;
        if (!time) {
            Tw = To;
            if (!to) to = tar;
        }
        if (!tar.length) {
            Tw = new Tw(tar, to, from, time, ease);
        }
        else if (tar.length === 1) {
            Tw = new Tw(tar[0], to, from, time, ease);
        }
        else {
            Tw = main.parallel.apply(null,
                reduce(tar, function (res, item) {
                    res.push(new Tw(item, to, from, time, ease));
                    return res;
                }, [])
            );
        }
        return Tw;
    },
    main = function (tar, to, time, ease) {
        return tw(tar, to, null, time, ease).play();
    };

main.to = function (tar, to, time, ease) { return tw(tar, to, null, time, ease); };
main.tween = function (tar, to, from, time, ease) { return tw(tar, to, from, time, ease); };
main.from = function (tar, from, time, ease) { return tw(tar, null, from, time, ease); };

main.serial = function () { return new Serial(arguments); };
main.parallel = function () { return new Parallel(arguments); };
main.delay = function (tw, delay) { return new Delay(tw, delay); };
main.func = function (fc, args) { return new Func(fc, args); };

main.pause = function () {
    var i=arguments.length, a;
    for(i; i--;) {
        a = arguments[i];
        if (!a) { return; }
        a.pause();
    }
};
main.end = function () {
    var i=arguments.length, a;
    for(i; i--;) {
        a = arguments[i];
        if (!a) { return; }
        a.end();
    }
};
module.exports = merge(main, ease);