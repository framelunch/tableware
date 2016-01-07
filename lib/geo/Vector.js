var Vector = function (x, y)
{
    this.x = x || 0;
    this.y = y || 0;
};
Vector.prototype = {
    length: function()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    equals: function(x, y)
    {
        return this.x===x && this.y===y;
    },
    equalsPoint: function(p)
    {
        return this.equals(p.x, p.y);
    }
};

module.exports = function (x, y) {
    return new Vector(x, y);
};