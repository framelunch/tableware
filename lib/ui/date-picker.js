'use strict';

var
    looptime = require('../utils/looptime'),
    Core = require('./date-picker/Core'),
    Input = require('./date-picker/Input'),
    main = function (id) {
        var elm = document.querySelector(id);
        if (elm.tagName === 'INPUT') {
            return new Input(id);
        } else {
            return new Core(id);
        }
    };

main.template = function (temp, elm) {
    var dp = new Input(elm),
        key = elm.getAttribute('tw-model');
    
    elm.setAttribute('type', 'text');
    dp
        .current(temp.get(key))
        .select(function (date) {
            temp.set(key, date);
            setTimeout(temp.update.bind(temp), looptime);

            temp.call(elm.getAttribute('tw-change'), date);
        });
};

module.exports = main;
