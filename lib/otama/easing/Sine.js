module.exports = {
    in:function(t,b,c,d)
    {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    out:function(t,b,c,d)
    {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    inout:function(t,b,c,d)
    {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    outin:function(t,b,c,d)
    {
        if (t < d / 2) {
            return (c / 2) * Math.sin((t * 2) / d * (Math.PI / 2)) + b;
        }
        return -(c / 2) * Math.cos((t * 2 - d) / d * (Math.PI / 2)) + (c / 2) + (b + c / 2);
    }
};
