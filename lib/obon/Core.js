var noop = require('utils/noop'),
    merge = require('utils/merge'),
    Matrix = require('o/Matrix'),
    Rectangle = require('o/Rectangle'),
    count = 0,

    Core = function ()
    {
        this.id = count++;
        this.mtx = Matrix();
        this.bounds = Rectangle();
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.sx = 1;
        this.sy = 1;
        this.color = 'rgba(0, 0, 0, 1)';
        this.hidden = false;
        this.parent = 1;
        this.canvas = null;
        this.hasUpdate = true;// for tween animation

        /** delegater **/
        this.draw = noop;
        /** delegater **/
    };

Core.__cache = {};
Core.prototype = {
    init: function (a) {
        var i=0, l=a.length;
        for(i; i<l; i++) {
            merge(this, a[i]);
        }

        if (typeof this.id === 'string') {
            Core.__cache[this.id] = this;
        }
        return this;
    },
    __draw:function(c)
    {
        var m = this.mtx.identity()
            .scale(this.sx, this.sy)
            .rotate(this.r)
            .translate(this.x, this.y)
            .concat(this.parent.mtx);

        c.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    },
    __update: function ()
    {
        if (this.canvas) this.canvas.update();
    },
    __addToCanvas: function () {},
    __removeFromCanvas: function () {},

    isHidden:(function()
    {
        var f = function(v)
        {
            if(!v){ return false; }
            if(v.hidden){ return true; }
            return f(v.parent);
        };
        return function() { return f(this); };
    }
    )(),
    show:function()
    {
        this.hidden = false;
        this.__update();
        return this;
    },
    hide:function()
    {
        this.hidden = true;
        this.__update();
        return this;
    },
    attr: function (attr, value)
    {
        if (!attr) return;

        if (typeof attr === 'object') {
            merge(this, attr);
        } else {
            this[attr] = value;
        }
        this.__update();
        return this;
    }
};

module.exports = Core;