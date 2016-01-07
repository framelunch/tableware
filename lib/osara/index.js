var
    Svg = require('./Svg'),
    main = function (domId) {
        return new Svg(domId.charAt(0)==='#' ? domId.slice(1) : domId);
    };

main.appendTo = function (dom, opt) {
    var svg = new Svg(null, opt.w, opt.h);

    if (typeof dom === 'object' && dom.appendChild) {
        dom.appendChild(svg.e);
    } else {
        document.getElementById(dom.slice(1)).appendChild(svg.e);
    }

    console.log(svg);
    return svg;
};

module.exports = main;