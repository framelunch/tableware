var
    loop = require('../core/loop'),
    noop = require('../utils/noop'),
    rgba = require('../utils/rgba'),
    degree = require('../utils/degree'),
    rgbaDiff = require('../utils/rgbaDiff'),
    inherit = require('../utils/inherit'),

    Core = require('./Core'),
    Element = require('./wrap/Element'),
    Window = require('./wrap/Window'),
    easing = require('./easing'),

    Tween = function (tar, to, from, time, ease) {
        if(!to && !from){ throw 'invalid parameter!'; return; }

        Core.call(this);
        tar = Core.target(tar);

        this.t = 0;
        this.len = 0;
        this.du = time || 0;
        this.ease = ease || easing.Linear;

        this.__tws = noop;
        this.__fixes = noop;
        this.__wp = tar.hasUpdate ? (tar.canvas || tar) : {update: noop};


        this.tar = tar;
        this.to = to;
        this.from = from;
        //this.__init(tar, to, from);
    };

Tween.prototype = {
    play: function()
    {
        this.__init(this.tar, this.to, this.from);

        if(!this.du){
            this.__onplay();
            this.end();
        }else{
            this.t = 0;
            Core.prototype.play.call(this);
        }
        return this;
    },
    end:function()
    {
        this.__fixes();
        this.__wp.update();
        Core.prototype.end.call(this);
    },
    update:function(step)
    {
        if(this.du - this.t<=0){
            this.end();
        }else{
            this.__tws();
            this.__wp.update();
            this.__onupdate();
            this.t += step;
        }
    },

    __init: function (tar, to, from)
    {
        var obj = to || from, p, func;

        to = to || tar;
        from = from || tar;

        for(p in obj) {
            if (func = this['__' + typeof tar[p]]) {
                func.call(this, tar, p, to, from, obj[p]);
                this.len++;
            }
        }
        this.__tws = this['__t' + this.len];
        this.__fixes = this['__f' + this.len];
    },
    __object: function (tar, p, to, from)
    {
        this.__init(tar[p], to[p], from[p]);
        this.len--;
    },
    __boolean: function (tar, p, to, from) {
        var d = to[p];
        this['_t' + this.len] = noop;
        this['_f' + this.len] = this.__fix;
        this['_' + this.len] = {t: tar, p: p, d: d};
    },
    __function: function (tar, p, to, from, params)
    {
        if (typeof params === 'object') {
            this.__functionWithObject(tar, p, to, from, params);
            return;
        }

        var b, d, c, func = tar[p];
        b = typeof from[p] === 'function' ? parseFloat(func.call(tar)) : from[p];
        d = typeof to[p] === 'function' ? parseFloat(func.call(tar)) : to[p];
        c = d - b;

        this['_t' + this.len] = this.__twfunc;
        this['_f' + this.len] = this.__fixfunc;
        this['_' + this.len] = {t: tar, p: func, c: c, b: b, d: d};
    },
    __functionWithObject: function (tar, p, to, from, params)
    {
        var b, d, c, v, func = tar[p], g = {};
        b = typeof from[p] === 'function' ? {} : from[p];
        d = typeof to[p] === 'function' ? {} : to[p];
        c = {};

        for (var n in params) {
            if (/#|rgb/.test(params[n])) {
                v = func.call(tar, n);
                b[n] = rgba(b[n] || v);
                if (d[n] === undefined) d[n] = v;
                c[n] = rgbaDiff(rgba(d[n]), b[n]);
                g[n] = this.__getColor;
            } else {
                v = parseFloat(func.call(tar, n));
                if (b[n] === undefined) b[n] = v;
                if (d[n] === undefined) d[n] = v;
                c[n] = d[n] - b[n];
                g[n] = this.__getValue;
            }
        }

        this['_t' + this.len] = this.__twfuncWithObj;
        this['_f' + this.len] = this.__fixfunc;
        this['_' + this.len] = {t: tar, p:func, c: c, b: b, d: d, s:{}, g:g};
    },
    __string: function (tar, p, to, from, params)
    {
        if (/#|rgb/.test(params)) {
            this.__color(tar, p, to, from, params);
            return;
        }

        var b, d, c;
        if(tar instanceof CSSStyleDeclaration && /top|bottom|left|right|width|height/.test(p)){
            b = (b = from[p]) === '' ? 0 : parseFloat(b);
            d = (c = to[p]) === '' ? 0 : parseFloat(c);
            c = d - b;
            this['_t' + this.len] = this.__twpx;
            this['_f' + this.len] = this.__fixpx;
        }else{
            d = to[p];
            this['_t' + this.len] = noop;
            this['_f' + this.len] = this.__fix;
        }
        this['_' + this.len] = {t: tar, p: p, c: c, b: b, d: d};
    },
    __color: function (tar, p, to, from)
    {
        var b, d, c;
        b = rgba(from[p]);
        d = to[p];
        c = rgbaDiff(rgba(d), b);

        this['_t' + this.len] = this.__twcolor;
        this['_f' + this.len] = this.__fix;
        this['_' + this.len] = {t: tar, p: p, c: c, b: b, d: d};
    },
    __number: function (tar, p, to, from)
    {
        if (p === 'degree') {
            this.__degree(tar, p, to, from);
            return;
        }
        var b, d, c;
        b = from[p] || 0;
        d = to[p] || 0;
        c = d - b;
        this['_t' + this.len] = this.__tw;
        this['_f' + this.len] = this.__fix;
        this['_' + this.len] = {t: tar, p: p, c: c, b: b, d: d};
    },
    __degree: function (tar, p, to, from)
    {
        var b, d, c;
        b = degree(from[p] || 0);
        d = degree(to[p] || 0);
        c = d - b;
        this['_t' + this.len] = this.__tw;
        this['_f' + this.len] = this.__fix;
        this['_' + this.len] = {t: tar, p: 'r', c: c, b: b, d: d};
    },

    __tw:function(o)
    {
        o.t[o.p] = this.ease(this.t, o.b, o.c, this.du);
    },
    __fix:function(o)
    {
        o.t[o.p] = o.d;
    },
    __twpx:function(o)
    {
        o.t[o.p] = this.ease(this.t, o.b, o.c, this.du)+'px';
    },
    __fixpx:function(o)
    {
        o.t[o.p] = o.d+'px';
    },

    __twcolor: function (o)
    {
        var b = o.b, c = o.c;
        o.t[o.p] = this.__getColor(b, c);
    },

    __twfunc: function (o) {
        o.p.call(o.t, this.ease(this.t, o.b, o.c, this.du));
    },
    __twfuncWithObj: function (o) {
        var obj = o.s, b= o.b, c= o.c, g=o.g, p;
        for(p in c) {
            obj[p] = g[p].call(this, b[p], c[p]);
        }
        o.p.call(o.t, obj);
    },
    __getValue: function (b, c) {
        return this.ease(this.t, b, c, this.du)
    },
    __getColor: function (b, c) {
        return 'rgba('
            + parseInt(this.ease(this.t, b.r, c.r, this.du)) + ',' +
            + parseInt(this.ease(this.t, b.g, c.g, this.du)) + ',' +
            + parseInt(this.ease(this.t, b.b, c.b, this.du)) + ',' +
            + this.ease(this.t, b.a, c.a, this.du) + ')';
    },

    __fixfunc: function (o) {
        o.p.call(o.t, o.d);
    },

    __t0: noop,
    __t1: function () { this._t0(this._0); },
    __t2: function () { this._t0(this._0);this._t1(this._1); },
    __t3: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2); },
    __t4: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3); },
    __t5: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3);this._t4(this._4); },
    __t6: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3);this._t4(this._4);this._t5(this._5); },
    __t7: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3);this._t4(this._4);this._t5(this._5);this._t6(this._6); },

    __f0: noop,
    __f1: function () { this._f0(this._0); },
    __f2: function () { this._f0(this._0);this._f1(this._1); },
    __f3: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2); },
    __f4: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3); },
    __f5: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3);this._f4(this._4); },
    __f6: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3);this._f4(this._4);this._f5(this._5); },
    __f7: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3);this._f4(this._4);this._f5(this._5);this._f6(this._6); }
};
module.exports = inherit(Tween, Core);