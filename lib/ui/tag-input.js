'use strict';

var 
    TagInput = require('./tag-input/TagInput'),

    main = function (elm) {
        elm = typeof elm==='string' ? document.querySelector(elm) : elm;
        return new TagInput(elm);
    };

module.exports = main;
