var Vector = require('../geo/Vector'),
    _get = function(par, vec2)
    {
        if(par){
            vec2.x += par.offsetLeft;
            vec2.y += par.offsetTop;
            return _get(par.offsetParent, vec2);
        }else{
            return vec2;
        }
    };

module.exports = function(dom)
{
    if(dom.offsetParent){
        return _get(dom.offsetParent, Vector(dom.offsetLeft, dom.offsetTop));
    }else{
        return new Vector();
    }
};