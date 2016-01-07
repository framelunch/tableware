var
    Matrix = function (a,b,c,d,tx,ty) {
        this.a = a||1;
        this.b = b||0;
        this.c = c||0;
        this.d = d||1;
        this.tx = tx||0;
        this.ty = ty||0;
    };

Matrix.prototype = {
    translate:function(x,y)
    {
        this.tx = x;
        this.ty = y;
        return this;
    },
    scale:function(x,y)
    {
        this.a = this.a*x;
        this.b = this.b*y;
        this.c = this.c*x;
        this.d = this.d*y;
        this.tx = this.tx*x;
        this.ty = this.ty*y;
        return this;
    },
    rotate:function(r)
    {
        this.getData();

        var a = Math.cos(r),
            b = Math.sin(r),
            c = -Math.sin(r),
            d = Math.cos(r),
            ow = this.getData();

        this.a = ow.a*a + ow.b*c;
        this.b = ow.a*b + ow.b*d;
        this.c = ow.c*a + ow.d*c;
        this.d = ow.c*b + ow.d*d;
        this.tx = ow.tx*a + ow.ty*c;
        this.ty = ow.tx*b + ow.ty*d;

        return this;
    },
    concat:function(m)
    {
        var ow = this.getData();

        this.a = ow.a*m.a + ow.b*m.c;
        this.b = ow.a*m.b + ow.b*m.d;
        this.c = ow.c*m.a + ow.d*m.c;
        this.d = ow.c*m.b + ow.d*m.d;
        this.tx = ow.tx*m.a + ow.ty*m.c + m.tx;
        this.ty = ow.tx*m.b + ow.ty*m.d + m.ty;

        return this;
    },
    getData:function()
    {
        return {a:this.a, b:this.b, c:this.c, d:this.d, tx:this.tx, ty:this.ty};
    },
    clone:function()
    {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    },
    identity:function()
    {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    },
    invert:function()
    {
        var ow = this.getData(),
            det = ow.a*ow.d - ow.c*ow.b;

        this.a = ow.d/det;
        this.b = -ow.b/det;
        this.c = -ow.c/det;
        this.d = ow.a/det;
        this.tx = (ow.c*ow.ty - ow.d*ow.tx)/det;
        this.ty = (ow.b*ow.tx - ow.a*ow.ty)/det;
        return this;
    },
    trans:function(x, y)
    {
        return {
            x:this.a*x + this.c*y + this.tx,
            y:this.b*x + this.d*y + this.ty
        };
    },
    transPoint:function(p)
    {
        return this.trans(p.x, p.y);
    }
};

module.exports = function (a,b,c,d,tx,ty) {
    return new Matrix(a,b,c,d,tx,ty);
};