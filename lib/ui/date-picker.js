'use strict';

var
    DatePicker = require('./date-picker/DatePicker'),
    DatePickerWithInput = require('./date-picker/DatePickerWithInput'),

    main = function (elm) {
        elm = typeof elm==='string' ? document.querySelector(elm) : elm;
        if (elm.tagName === 'INPUT') {
            return new DatePickerWithInput(elm);
        } else {
            return new DatePicker(elm);
        }
    };

module.exports = main;
