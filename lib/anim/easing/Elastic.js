var
    _in = function(t,b,c,d,a,p)
    {
        if (t == 0) { return b;	}
        if ((t /= d) == 1) { return b + c; }
        if (!p) { p = d * 0.3; }
        var s;
        if (!a || a < Math.abs(c)) { a = c;	s = p / 4; }
        else { s = p / (2 * Math.PI) * Math.asin(c / a); }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    _out = function(t,b,c,d,a,p)
    {
        if (t == 0) { return b;	}
        if ((t /= d) == 1) { return b + c; }
        if (!p) { p = d * 0.3; }
        var s;
        if (!a || a < Math.abs(c)) { a = c;	s = p / 4; }
        else { s = p / (2 * Math.PI) * Math.asin(c / a); }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    _inout = function(t,b,c,d,a,p)
    {
        if (t == 0) { return b;	}
        if ((t /= d / 2) == 2) { return b + c; }
        if (!p) { p = d * (0.3 * 1.5); }
        var s;
        if (!a || a < Math.abs(c)) { a = c;	s = p / 4; }
        else { s = p / (2 * Math.PI) * Math.asin(c / a); }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    _outin = function(t,b,c,d,a,p)
    {
        var s;
        c /= 2;
        if (t < d / 2) {
            if ((t *= 2) == 0) { return b; }
            if ((t /= d) == 1) { return b + c; }
            if (!p) { p = d * 0.3; }
            if (!a || a < Math.abs(c)) { a = c; s = p / 4; }
            else { s = p / (2 * Math.PI) * Math.asin(c / a); }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        }else {
            if ((t = t * 2 - d) == 0) { return (b + c); }
            if ((t /= d) == 1) { return (b + c) + c; }
            if (!p) { p = d * 0.3; }
            if (!a || a < Math.abs(c)) { a = c;	s = p / 4; }
            else { s = p / (2 * Math.PI) * Math.asin(c / a); }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + (b + c);
        };
    };

module.exports = {
    in:function(t,b,c,d){ return _in(t,b,c,d,0,0); },
    out:function(t,b,c,d){ return _out(t,b,c,d,0,0); },
    inout:function(t,b,c,d){ return _inout(t,b,c,d,0,0); },
    outin:function(t,b,c,d){ return _outin(t,b,c,d,0,0); },
    inWith:function(a,p){ return function(t,b,c,d){ return _in(t,b,c,d,a,p); }; },
    outWith:function(a,p){ return function(t,b,c,d){ return _out(t,b,c,d,a,p); }; },
    inoutWith:function(a,p){ return function(t,b,c,d){ return _inout(t,b,c,d,a,p); }; },
    outinWith:function(a,p){ return function(t,b,c,d){ return _outin(t,b,c,d,a,p); }; }
};
