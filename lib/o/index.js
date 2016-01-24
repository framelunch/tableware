var
    OWindow = require('./OWindow'),
    OElement = require('./OElement'),
    OAll = require('./OAll'),

    main = function (tar, val) {
        if(typeof tar === 'string' && !/^(#|\.)/.test(tar))
        {
            return OElement.__cache[tar] || new OElement(document.createElement(tar), val);
        }
        else if (typeof tar.scrollTo === 'function')
        {
            return new OWindow(tar, val);
        }
        else
        {
            return new OElement(tar, val);
        }
    };

main.selectAll = function (id, val) {
    return new OAll(document.querySelectorAll(id), val);
};

module.exports = main;