'use strict';

var Core = require('./canvas/Core'),
    Canvas = require('./canvas/Canvas'),
    View = require('./canvas/View'),
    Sprite = require('./canvas/Sprite'),
    Responder = require('./canvas/Responder'),
    degree = require('./utils/degree'),

    main = function (dom) {
        var cv = Core.__cache[dom];
        if (cv) {
            return cv;
        } else {
            return Core.__cache[dom] = new Canvas(dom);
        }
    };

main.appendTo = function (dom, opt) {
    var cv = new Canvas(null, opt.w, opt.h);

    if (typeof dom === 'object' && dom.appendChild) {
        dom.appendChild(cv.e);
    } else {
        document.querySelector(dom).appendChild(cv.e);
    }

    if (opt.id) {
        cv.e.id = opt.id;
        Core.__cache[opt.id] = cv;
    }
    return cv;
};

main.view = function ()
{
    return new View().init(arguments);
};
main.sprite = function ()
{
    return new Sprite().init(arguments);
};
main.responder = function () {
    return new Responder().init(arguments);
};

main.degree = degree;
module.exports = main;


