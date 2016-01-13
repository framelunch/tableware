module.exports = {
    in:function(t,b,c,d)
    {
        return c * (t /= d) * t + b;
    },
    out:function(t,b,c,d)
    {
        return -c * (t /= d) * (t - 2) + b;
    },
    inout:function(t,b,c,d)
    {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    outin:function(t,b,c,d)
    {
        if (t < d / 2) {
            return -(c / 2) * (t = (t * 2 / d)) * (t - 2) + b;
        }
        return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
    }
};
