var
    _in = function(t, b, c, d, s)
    {
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    _out = function(t, b, c, d, s)
    {
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    _inout = function(t, b, c, d, s)
    {
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s * 1.525) + 1) * t - s * 1.525)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s * 1.525) + 1) * t + s * 1.525) + 2) + b;
    },
    _outin = function(t, b, c, d, s)
    {
        if (t < d / 2) {
            return (c / 2) * ((t = (t * 2) / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        }
        return (c / 2) * (t = (t * 2 - d) / d) * t * ((s + 1) * t - s) + (b + c / 2);
    };

module.exports = {
    in:function(t,b,c,d){ return _in(t,b,c,d,1.70158); },
    out:function(t,b,c,d){ return _out(t,b,c,d,1.70158); },
    inout:function(t,b,c,d){ return _inout(t,b,c,d,1.70158); },
    outin:function(t,b,c,d){ return _outin(t,b,c,d,1.70158); },
    inWith:function(s){ return function(t,b,c,d){ return _in(t,b,c,d,s); }; },
    outWith:function(s){ return function(t,b,c,d){ return _out(t,b,c,d,s); }; },
    inoutWith:function(s){ return function(t,b,c,d){ return _inout(t,b,c,d,s); }; },
    outinWith:function(s){ return function(t,b,c,d){ return _outin(t,b,c,d,s); }; }
};
