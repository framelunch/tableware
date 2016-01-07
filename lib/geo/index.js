var Vector = require('./Vector'),
    Rectangle = require('./Rectangle'),
    Matrix = require('./Matrix');

module.exports = {
    degree: function (value)
    {
        return Math.PI*value/180;
    },
    globalVector: (function ()
    {
        var _get = function(par, vec2)
        {
            if(par){
                vec2.x += par.offsetLeft;
                vec2.y += par.offsetTop;
                return _get(par.offsetParent, vec2);
            }else{
                return vec2;
            }
        };

        return function(dom)
        {
            if(dom.offsetParent){
                return _get(dom.offsetParent, new Vector(dom.offsetLeft, dom.offsetTop));
            }else{
                return new Vector();
            }
        };
    })(),
    scrollVector: (function () {
        var vec = new Vector();

        return function () {
            vec.x = window.scrollX;
            vec.y = window.scrollY;
            return vec;
        };
    })()
};
