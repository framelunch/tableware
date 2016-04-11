'use strict';

module.exports = {
    in:function(t,b,c,d)
    {
        return c * (t /= d) * t * t * t * t + b;
    },
    out:function(t,b,c,d)
    {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    inout:function(t,b,c,d)
    {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    outin:function(t,b,c,d)
    {
        if (t < d / 2) {
            return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
        }
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
    }
};
