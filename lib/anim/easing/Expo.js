'use strict';

module.exports = {
    in:function(t,b,c,d)
    {
        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    out:function(t,b,c,d)
    {
        return t === d ? b + c : c * (1 - Math.pow(2, -10 * t / d)) + b;
    },
    inout:function(t,b,c,d)
    {
        if (t === 0) { return b;	}
        if (t === d) { return b + c;	}
        if ((t /= d / 2.0) < 1.0) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        return c / 2 * (2 - Math.pow(2, -10 * --t)) + b;
    },
    outin:function(t,b,c,d)
    {
        if (t < d / 2.0) {
            return t * 2.0 === d ? b + c / 2.0 : c / 2.0 * (1 - Math.pow(2, -10 * t * 2.0 / d)) + b;
        }
        return (t * 2.0 - d) === 0 ? b + c / 2.0 : c / 2.0 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2.0;
    }
};
