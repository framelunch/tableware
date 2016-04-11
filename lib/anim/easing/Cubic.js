'use strict';

module.exports = {
    in:function(t,b,c,d){
        return c * (t /= d) * t * t + b;
    },
    out:function(t,b,c,d){
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    inout:function(t,b,c,d){
        return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    outin:function(t,b,c,d){
        return t < d / 2 ? c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b : c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
    }
};
