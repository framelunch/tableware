module.exports = {
    in:function(t,b,c,d)
    {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    out:function(t,b,c,d)
    {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    inout:function(t,b,c,d)
    {
        if ((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    outin:function(t,b,c,d)
    {
        if (t < d / 2) {
            return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
        }
        return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
    }
};
