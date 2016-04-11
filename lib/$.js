'use strict';

var
    cache = {},
    win = null,
    Oe = require('./$/$Element'),
    Ow = require('./$/$Window'),

    main = function (tar, val) {
        var result;
        if (typeof tar === 'string') {
            if (!(result = cache[tar])) {
                if (/^<.+>$/.test(tar)) {
                    result = document.createElement('div');
                    result.innerHTML = tar;
                    result = new Oe([result.firstChild]);
                }else{
                    result = new Oe(document.querySelectorAll(tar));
                }
            }
        } else {
            if (typeof tar.location === 'object') {
                result = win || (win = new Ow(tar));
            } else {
                result = new Oe([tar]);
            }
        }

        result.init(val);
        if (typeof result.id === 'string') {
            cache[result.id] = result;
        }
        return result;
    };

module.exports = main;
