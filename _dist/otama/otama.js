/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var otama = __webpack_require__(22);
	window.otama = otama;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = function(){ return null; };


/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	module.exports = function (to, from)
	{
	    var o1=to.prototype,
	        o2=from.prototype;

	    for(var p in o2){
	        if(o1[p]!=null){ continue; }
	        o1[p] = o2[p];
	    }
	    return to;
	};


/***/ },
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	module.exports = 40;


/***/ },
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var
	    dummy = {update:function(){}},
	    count = 0,
	    Node,
	    Cp;

	Node = function(fc, prev, next){
	    this.func = fc;
	    this.prev = prev;
	    this.next = next;
	    this.available = false;
	};
	Node.prototype = {
	    update: function(args){
	        this.func.apply(null, args||[]);
	        this.next.update(args);
	    },
	    reverse: function(args){
	        this.func.apply(null, args||[]);
	        this.prev.update(args);
	    },
	    release: function(){
	        delete this.func;
	        delete this.next;
	        delete this.prev;
	    }
	};
	Cp = function () {
	    count += 1;
	    this.id = count;
	    this.index = 1;
	    this.length = 0;
	    this.first = new Node(function(){}, dummy, dummy);
	    this.current = this.first;
	    this.list = {};
	};
	Cp.prototype = {
	    update: function (args) {
	        this.first.update(args);
	    },
	    reverse: function (args) {
	        this.current.reverse(args);
	    },
	    add: function(fc){
	        var n, id;

	        id = fc['__coupling__' + this.id];
	        if (id) {
	            n = this.list[id];
	            if (n.available) {
	                return;
	            } else {
	                n.prev = this.current;
	                n.next = dummy; }
	        } else {
	            id = fc['__coupling__' + this.id] = this.index++;
	            n = this.list[id] = new Node(fc, this.current, dummy);
	        }

	        n.available = true;
	        this.current.next = n;
	        this.current = n;

	        this.length += 1;
	        return fc;
	    },
	    remove: function(fc){
	        var id, n;

	        id = fc['__coupling__' + this.id];
	        if (!id) {
	            return null;
	        }

	        n = this.list[id];
	        if (!n.available) { return; }

	        n.prev.next = n.next;
	        n.next.prev = n.prev;

	        if (this.current===n) { this.current = n.prev; }
	        n.available = false;

	        this.length -= 1;
	        return id;
	    },
	    dispose: function(fc){
	        var id = this.remove(fc);
	        delete this.list[id];
	        delete fc['__coupling__' + this.id];
	    },
	    release: function(){
	        var
	            n, p,
	            list = this.list;

	        for (p in list) {
	            n = list[p];
	            delete n.fc['__coupling__' + this.id];
	            n.release();
	        }
	        delete this.id;
	        delete this.index;
	        delete this.length;
	        delete this.first;
	        delete this.current;
	        delete this.list;
	    }
	};

	module.exports = function () {
	    return new Cp();
	};

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var
	    Tween = __webpack_require__(23),
	    Serial = __webpack_require__(37),
	    Parallel = __webpack_require__(38),
	    Delay = __webpack_require__(39),
	    Func = __webpack_require__(40),
	    main = function (tar, to, time, ease) {
	        return new Tween(tar, to, null, time, ease).play();
	    };

	main.tween = function (tar, to, from, time, ease) { return new Tween(tar, to, from, time, ease); };
	main.to = function (tar, to, time, ease) { return new Tween(tar, to, null, time, ease); };
	main.from = function (tar, from, time, ease) { return new Tween(tar, null, from, time, ease); };
	main.serial = function () { return new Serial(arguments); };
	main.parallel = function () { return new Parallel(arguments); };
	main.delay = function (tw, delay) { return new Delay(tw, delay); };
	main.func = function (fc, args) { return new Func(fc, args); };

	main.pause = function () {
	    var i=arguments.length, a;
	    for(i; i--;) {
	        a = arguments[i];
	        if (!a) { return; }
	        if (a.status) { a.pause(); }
	    }
	};
	main.end = function () {
	    var i=arguments.length, a;
	    for(i; i--;) {
	        a = arguments[i];
	        if (!a) { return; }
	        if (a.status) { a.end(); }
	    }
	};

	module.exports = main;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var
	    loop = __webpack_require__(24),
	    noop = __webpack_require__(3),
	    inherit = __webpack_require__(8),
	    Core = __webpack_require__(25),
	    easing = __webpack_require__(26),

	    Tween = function (tar, to, from, time, ease) {
	        if(!to && !from){ throw 'invalid parameter!'; return; }

	        Core.call(this);
	        this.t = 0;
	        this.len = 0;
	        this.du = time || 0;
	        this.ease = (typeof ease === 'string' ? easing[ease.toLowerCase()] : ease) || easing.Linear;

	        this.__tws = noop;
	        this.__fixes = noop;
	        this.__cv = tar.canvas || {update: noop};

	        this.__init(tar, to, from);
	    };

	Tween.prototype = {
	    play: function()
	    {
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
	        this.__cv.update();
	        Core.prototype.end.call(this);
	    },
	    update:function(step)
	    {
	        if(this.du - this.t<=0){
	            this.end();
	        }else{
	            this.__tws();
	            this.__cv.update();
	            this.__onupdate();
	            this.t += step;
	        }
	    },

	    __init: function (tar, to, from) {
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
	    __object: function (tar, p, to, from) {
	        this.len--;
	        this.__init(tar[p], to[p], from[p]);
	    },
	    __function: function (tar, p, to, from, params) {
	        var b, d, c, v,
	            func = tar[p];

	        if (typeof params === 'object') {
	            b = typeof from[p] === 'function' ? {} : from[p];
	            d = typeof to[p] === 'function' ? {} : to[p];
	            c = {};

	            for (var n in params) {
	                v = parseFloat(/offset/.test(p) ? func.call(tar)[n] : func.call(tar, n));

	                b[n] = b[n] || v;
	                d[n] = d[n] || v;
	                c[n] = d[n] - b[n];
	            }

	            this['_t' + this.len] = this['__twfuncWithObj'];
	            this['_f' + this.len] = this['__fixfunc'];
	            this['_' + this.len] = {t: tar, p:func, c: c, b: b, d: d, s:{}};
	        } else {
	            b = typeof from[p] === 'function' ? parseFloat(func.call(tar)) : from[p];
	            d = typeof to[p] === 'function' ? parseFloat(func.call(tar)) : to[p];
	            c = d - b;

	            this['_t' + this.len] = this['__twfunc'];
	            this['_f' + this.len] = this['__fixfunc'];
	            this['_' + this.len] = {t: tar, p:func, c: c, b: b, d: d};
	        }
	    },
	    __string: function (tar, p, to, from) {
	        var b, d, c;
	        b = (b = from[p]) === '' ? 0 : parseFloat(b);
	        d = (c = to[p]) === '' ? 0 : parseFloat(c);
	        c = d - b;
	        if(tar instanceof CSSStyleDeclaration && /|top|bottom|left|right|width|height/.test(p)){
	            this['_t' + this.len] = this.__twpx;
	            this['_f' + this.len] = this.__fixpx;
	        }else{
	            this['_t' + this.len] = this.__tw;
	            this['_f' + this.len] = this.__fix;
	        }
	        this['_' + this.len] = {t: tar, p: p, c: c, b: b, d: d};
	    },
	    __number: function (tar, p, to, from) {
	        var b, d, c;
	        b = from[p];
	        d = to[p];
	        c = d - b;
	        this['_t' + this.len] = this.__tw;
	        this['_f' + this.len] = this.__fix;
	        this['_' + this.len] = {t: tar, p: p, c: c, b: b, d: d};
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

	    __twfunc: function (o) {
	        o.p.call(o.t, this.ease(this.t, o.b, o.c, this.du));
	    },
	    __twfuncWithObj: function (o) {
	        var obj = o.s, b= o.b, c= o.c, p;
	        for(p in c) {
	            obj[p] = this.ease(this.t, b[p], c[p], this.du);
	        }
	        o.p.call(o.t, obj);
	    },
	    __fixfunc: function (o) {
	        o.p.call(o.t, o.d);
	    },

	    __t1: function () { this._t0(this._0); },
	    __t2: function () { this._t0(this._0);this._t1(this._1); },
	    __t3: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2); },
	    __t4: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3); },
	    __t5: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3);this._t4(this._4); },
	    __t6: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3);this._t4(this._4);this._t5(this._5); },
	    __t7: function () { this._t0(this._0);this._t1(this._1);this._t2(this._2);this._t3(this._3);this._t4(this._4);this._t5(this._5);this._t6(this._6); },

	    __f1: function () { this._f0(this._0); },
	    __f2: function () { this._f0(this._0);this._f1(this._1); },
	    __f3: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2); },
	    __f4: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3); },
	    __f5: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3);this._f4(this._4); },
	    __f6: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3);this._f4(this._4);this._f5(this._5); },
	    __f7: function () { this._f0(this._0);this._f1(this._1);this._f2(this._2);this._f3(this._3);this._f4(this._4);this._f5(this._5);this._f6(this._6); }
	};
	module.exports = inherit(Tween, Core);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var
	    cp = __webpack_require__(16)(),
	    time = __webpack_require__(11),
	    id;

	module.exports = {
	    add: function (func) {
	        cp.add(func);
	        if (!id) {
	            id = setInterval(function(){ cp.update(); }, time);
	        }
	        return func;
	    },
	    remove: function (func) {
	        cp.remove(func);
	        if (!cp.length) {
	            clearInterval(id);
	            id = null;
	        }
	    }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var
	    loop = __webpack_require__(24),
	    noop = __webpack_require__(3),
	    step = __webpack_require__(11),

	    Core = function () {
	        this.status = 0;
	        this.__onplay = noop;
	        this.__onupdate = noop;
	        this.__onpause = noop;
	        this.__onend = noop;

	        var self = this, stp = step;
	        this.__update = function () {
	            self.update(stp);
	        };
	    };

	Core.prototype = {
	    sync: function (name, fc) {
	        if (typeof name === 'object') {
	            if (typeof name.play === 'function') { this.__onplay = name.play; }
	            if (typeof name.pause === 'function') { this.__onpause = name.pause; }
	            if (typeof name.update === 'function') { this.__onupdate = name.update; }
	            if (typeof name.end === 'function') { this.__onend = name.end; }
	        } else {
	            switch(name) {
	                case 'play': this.__onplay = fc || noop; break;
	                case 'pause': this.__onpause = fc || noop; break;
	                case 'update': this.__onupdate = fc || noop; break;
	                case 'end': this.__onend = fc || noop; break;
	            }
	        }
	        return this;
	    },
	    play:function(){
	        this.status = 1;
	        this.__onplay();
	        loop.add(this.__update);
	        return this;
	    },
	    pause:function(){
	        if(this.status<1) { return false; }
	        this.status = 2;
	        this.__onpause();
	        loop.remove(this.__update);
	        return true;
	    },
	    resume:function(){
	        if(this.status<2){ return false; }
	        this.status = 1;
	        loop.add(this.__update);
	        return true;
	    },
	    end:function(){
	        this.status = 0;
	        loop.remove(this.__update);
	        this.__onupdate();
	        this.__onend();
	    },
	    update: noop
	};
	module.exports = Core;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Back = __webpack_require__(27),
	    Bounce = __webpack_require__(28),
	    Circ = __webpack_require__(29),
	    Cubic = __webpack_require__(30),
	    Elastic = __webpack_require__(31),
	    Expo = __webpack_require__(32),
	    Quad = __webpack_require__(33),
	    Quart = __webpack_require__(34),
	    Quint = __webpack_require__(35),
	    Sine = __webpack_require__(36);

	module.exports = {
	    Linear: function(t,b,c,d){ return c * t / d + b; },

	    backin: Back.in,
	    backout: Back.out,
	    backinout: Back.inout,
	    backoutin: Back.outin,
	    backinwith: Back.inWith,
	    backoutwith: Back.outWith,
	    backinoutwith: Back.inoutWith,
	    backOutinwith: Back.outinWith,

	    bouncein: Bounce.in,
	    bounceout: Bounce.out,
	    bounceinout: Bounce.inout,
	    bounceoutin: Bounce.outin,

	    circin: Circ.in,
	    circout: Circ.out,
	    circinout: Circ.inout,
	    circoutin: Circ.outin,

	    cubicin: Cubic.in,
	    cubicout: Cubic.out,
	    cubiciniut: Cubic.inout,
	    cubicouton: Cubic.outin,

	    elasticin: Elastic.in,
	    elasticout: Elastic.out,
	    elasticinout: Elastic.inout,
	    elasticoutin: Elastic.outin,
	    elasticinwith: Elastic.inWith,
	    elasticoutwith: Elastic.outWith,
	    elasticinoutwith: Elastic.inoutWith,
	    elasticoutinwith: Elastic.outinWith,

	    expoin: Expo.in,
	    expoout: Expo.out,
	    expoinout: Expo.inout,
	    expooutin: Expo.outin,

	    quadin: Quad.in,
	    quadout: Quad.out,
	    quadinout: Quad.inout,
	    quadoutin: Quad.outin,

	    quartin: Quart.in,
	    quartout: Quart.out,
	    quartinout: Quart.inout,
	    quartoutin: Quart.outin,

	    quintin: Quint.in,
	    quintout: Quint.out,
	    quintinout: Quint.inout,
	    quintoutin: Quint.outin,

	    sinein: Sine.in,
	    sineout: Sine.out,
	    sineinout: Sine.inout,
	    sineoutin: Sine.outin
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

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


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {
	    in:function(t,b,c,d)
	    {
	        if ((t = (d - t) / d) < (1 / 2.75)) {
	            return c - (c * (7.5625 * t * t)) + b;
	        }
	        if (t < (2 / 2.75)) {
	            return c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + b;
	        }
	        if (t < (2.5 / 2.75)) {
	            return c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + b;
	        }
	        return c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + b;
	    },
	    out:function(t,b,c,d)
	    {
	        if ((t /= d) < (1 / 2.75)) {
	            return c * (7.5625 * t * t) + b;
	        }
	        if (t < (2 / 2.75)) {
	            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
	        }
	        if (t < (2.5 / 2.75)) {
	            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
	        }
	        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	    },
	    inout:function(t,b,c,d)
	    {
	        if (t < d / 2) {
	            if ((t = (d - t * 2) / d) < (1 / 2.75)) {
	                return (c - (c * (7.5625 * t * t))) * 0.5 + b;
	            }
	            if (t < (2 / 2.75)) {
	                return (c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75))) * 0.5 + b;
	            }
	            if (t < (2.5 / 2.75)) {
	                return (c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375))) * 0.5 + b;
	            }
	            return (c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375))) * 0.5 + b;
	        }
	        else {
	            if ((t = (t * 2 - d) / d) < (1 / 2.75)) {
	                return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
	            }
	            if (t < (2 / 2.75)) {
	                return (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) * 0.5 + c * 0.5 + b;
	            }
	            if (t < (2.5 / 2.75)) {
	                return (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) * 0.5 + c * 0.5 + b;
	            }
	            return (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) * 0.5 + c * 0.5 + b;
	        }
	    },
	    outin:function(t,b,c,d)
	    {
	        if (t < d / 2) {
	            if ((t = (t * 2) / d) < (1 / 2.75)) {
	                return (c / 2) * (7.5625 * t * t) + b;
	            }
	            if (t < (2 / 2.75)) {
	                return (c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
	            }
	            if (t < (2.5 / 2.75)) {
	                return (c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
	            }
	            return (c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	        }
	        else {
	            if ((t = (d - (t * 2 - d)) / d) < (1 / 2.75)) {
	                return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
	            }
	            if (t < (2 / 2.75)) {
	                return (c / 2) - ((c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + (b + c / 2);
	            }
	            if (t < (2.5 / 2.75)) {
	                return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + (b + c / 2);
	            }
	            return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + (b + c / 2);
	        }
	    }
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

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


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {
	    in:function(t,b,c,d){
	        return c * (t /= d) * t * t + b;
	    },
	    out:function(t,b,c,d){
	        return c * ((t = t / d - 1) * t * t + 1) + b;
	    },
	    inout:function(t,b,c,d){
	        return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
	    },
	    outin:function(t,b,c,d){
	        return t < d / 2 ? c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b : c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
	    }
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

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


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = {
	    in:function(t,b,c,d)
	    {
	        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	    },
	    out:function(t,b,c,d)
	    {
	        return t == d ? b + c : c * (1 - Math.pow(2, -10 * t / d)) + b;
	    },
	    inout:function(t,b,c,d)
	    {
	        if (t == 0) { return b;	}
	        if (t == d) { return b + c;	}
	        if ((t /= d / 2.0) < 1.0) {
	            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	        }
	        return c / 2 * (2 - Math.pow(2, -10 * --t)) + b;
	    },
	    outin:function(t,b,c,d)
	    {
	        if (t < d / 2.0) {
	            return t * 2.0 == d ? b + c / 2.0 : c / 2.0 * (1 - Math.pow(2, -10 * t * 2.0 / d)) + b;
	        }
	        return (t * 2.0 - d) == 0 ? b + c / 2.0 : c / 2.0 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2.0;
	    }
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

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


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {
	    in:function(t,b,c,d)
	    {
	        return c * (t /= d) * t * t * t + b;
	    },
	    out:function(t,b,c,d)
	    {
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    },
	    inout:function(t,b,c,d)
	    {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t + b;
	        }
	        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    },
	    outin:function(t,b,c,d)
	    {
	        if (t < d / 2) {
	            return -(c / 2) * ((t = (t * 2) / d - 1) * t * t * t - 1) + b;
	        }
	        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t + (b + c / 2);
	    }
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = {
	    in:function(t,b,c,d)
	    {
	        return c * (t /= d) * t * t * t * t + b;
	    },
	    out:function(t,b,c,d)
	    {
	        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	    },
	    inout:function(t,b,c,d)
	    {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t * t + b;
	        }
	        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    },
	    outin:function(t,b,c,d)
	    {
	        if (t < d / 2) {
	            return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
	        }
	        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
	    }
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

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


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(8),
	    Core = __webpack_require__(25),
	    Serial = function (args) {
	        Core.call(this);

	        this.list = args;
	        this.len = args.length;
	        this.i = 0;

	        for(var i=this.len,s=this; i--;){
	            this.list[i].pause();
	            this.list[i].__onend = function(){
	                if(s.status===-1){ return; }
	                if(++s.i===s.len){ Core.prototype.end.call(s); }else{ s._cplay(); }
	            };
	        }
	    };

	Serial.prototype = {
	    update: function () {
	        this.__onupdate();
	    },
	    play:function(){
	        Core.prototype.play.call(this);
	        this.i = 0;
	        this._cplay();
	        return this;
	    },
	    _cplay:function(){
	        this.list[this.i].play(true);
	    },
	    pause:function(){
	        if(!Core.prototype.pause.call(this)){ return; }
	        this.list[this.i].pause();
	    },
	    resume:function(){
	        if(!Core.prototype.resume.call(this)){ return; }
	        this.list[this.i].resume();
	    },
	    end:function(){
	        this.status = -1;

	        for(var i=0,l=this.len,item; i<l; i++){
	            item = this.list[i];
	            item.end();
	        }
	        Core.prototype.end.call(this);
	    }
	};
	module.exports = inherit(Serial, Core);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(8),
	    Core = __webpack_require__(25),
	    Parallel = function (args) {
	        Core.call(this);
	        this.list = args;
	        this.len = args.length;
	        this.i = 0;

	        for(var i=this.len,s=this; i--;){
	            this.list[i].pause();
	            this.list[i].__onend = function(){
	                if(s.status===-1){ return; }
	                if((++s.i)===s.len){ Core.prototype.end.call(s); };
	            };
	        }
	    };

	Parallel.prototype = {
	    update: function ()
	    {
	        this.__onupdate();
	    },
	    play:function()
	    {
	        Core.prototype.play.call(this);
	        this.i = 0;
	        for(var i=0,l=this.len; i<l; i++){
	            this.list[i].play(true);
	        }
	        return this;
	    },
	    pause:function()
	    {
	        if(!Core.prototype.pause.call(this)){ return; }
	        for(var i=0,l=this.len; i<l; i++){
	            this.list[i].pause();
	        }
	    },
	    resume:function()
	    {
	        if(!Core.prototype.resume.call(this)){ return; }
	        for(var i=0,l=this.len; i<l; i++){
	            this.list[i].resume();
	        }
	    },
	    end:function()
	    {
	        this.status = -1;

	        for(var i=0,l=this.len; i<l; i++){
	            item = this.list[i];
	            if(item.status!==3){ item.end(); }
	        }
	        Core.prototype.end.call(this);
	    }
	};
	module.exports = inherit(Parallel, Core);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(8),
	    loop = __webpack_require__(24),
	    Core = __webpack_require__(25),

	    Delay = function (tw, delay) {
	        Core.call(this);
	        tw.pause();
	        this.tw = tw;
	        this.delay = delay;

	        var self = this;
	        this.tw.__onend = function () {
	            if(self.status!==1){ Core.prototype.end.call(self); }
	        };
	    };

	Delay.prototype = {
	    play:function()
	    {
	        this.t = 0;
	        this.tw.__onupdate = this.__onupdate;
	        this.tw.__onpause = this.__onpause;
	        Core.prototype.play.call(this);
	        return this;
	    },
	    pause:function()
	    {
	        if(this.delay===this.t){
	            this.tw.pause();
	        }else{
	            Core.prototype.pause.call(this);
	        }
	    },
	    resume:function()
	    {
	        if(this.delay===this.t){
	            this.tw.resume();
	        }else{
	            Core.prototype.resume.call(this);
	        }
	    },
	    end:function()
	    {
	        this.status = 0;
	        this.tw.end();
	    },
	    update:function(step)
	    {
	        if(this.delay-this.t<step){
	            this.t = this.delay;
	            loop.remove(this.__update);
	            this.status = 0;
	            this.tw.play();
	        }else{
	            this.t += step;
	        }
	    }
	};
	module.exports = inherit(Delay, Core);


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var noop = __webpack_require__(3),
	    Func = function (fc, args) {
	        this.fc = typeof(fc)==='function' ? fc : noop;
	        this.args = args || [];
	        this.__onend = noop;
	    };

	Func.prototype = {
	    sync: function (name, fc)
	    {
	        if (typeof name === 'object') {
	            if (typeof name.end === 'function') { this.__onend = name.end; }
	        }else{
	            if (name==='end'){ this.__onend = fc; }
	        }
	    },
	    play:function()
	    {
	        this.end();
	        return this;
	    },
	    pause:function(){},
	    resume:function(){},
	    end:function()
	    {
	        this.fc.apply(null, this.args);
	        this.__onend();
	    }
	};
	module.exports = Func;


/***/ }
/******/ ]);