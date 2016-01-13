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

	var obon = __webpack_require__(1);
	obon.degree = __webpack_require__(21);
	window.obon = obon;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Core = __webpack_require__(2),
	    Canvas = __webpack_require__(7),
	    View = __webpack_require__(17),
	    Sprite = __webpack_require__(18),
	    Responder = __webpack_require__(19),

	    main = function (dom) {
	        var cv = Core.__cache[dom];
	        if (cv) {
	            return cv;
	        } else {
	            return Core.__cache[dom] = new Canvas(dom);
	        }
	    };

	main.appendTo = function (dom, opt) {
	    var cv = new Canvas(null, opt.w, opt.h);

	    if (typeof dom === 'object' && dom.appendChild) {
	        dom.appendChild(cv.e);
	    } else {

	        document.querySelector(dom).appendChild(cv.e);
	    }

	    if (opt.id) {
	        Core.__cache[opt.id] = cv;
	    }
	    return cv;
	};

	main.select = function (str)
	{
	    return Core.__cache[str];
	};
	main.view = function ()
	{
	    return new View().init(arguments);
	};
	main.sprite = function ()
	{
	    return new Sprite().init(arguments);
	};
	main.responder = function () {
	    return new Responder().init(arguments);
	};

	module.exports = main;




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var noop = __webpack_require__(3),
	    merge = __webpack_require__(4),
	    Matrix = __webpack_require__(5),
	    Rectangle = __webpack_require__(6),
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(){ return null; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	var main = function (to, from) {
	    var name, value;
	    for(name in from) {
	        value = from[name];
	        if (typeof to[name] === 'object') {
	            main(to[name], value);
	        } else {
	            to[name] = value;
	        }
	    }
	    return to;
	};

	module.exports = main;

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var noop = __webpack_require__(3),
	    Rectangle = function (x, y, w, h)
	    {
	        this.x = x||0;
	        this.y = y||0;
	        this.w = w||0;
	        this.h = h||0;
	        this.__setUnion();
	    };

	Rectangle.prototype = {
	    contains: function(x,y)
	    {
	        return x>this.x &&x <(this.w+this.x) && y>this.y && y<(this.h+this.y);
	    },
	    containsPoint: function(p)
	    {
	        return this.contains(p.x, p.y);
	    },
	    get: function(){
	        return {x:this.x, y:this.y, w:this.w, h:this.h};
	    },
	    right: function()
	    {
	        return this.w+this.x;
	    },
	    bottom: function()
	    {
	        return this.h+this.y;
	    },
	    empty: function()
	    {
	        this.x = this.y = this.w = this.h = 0;
	        this.union = this.__union1;
	    },
	    union: noop,

	    __setUnion: function()
	    {
	        if(this.x | this.y | this.w | this.h){
	            this.union=this.__union2;
	        }else{
	            this.union=this.__union1;
	        }
	    },
	    __union1: function(rect)
	    {
	        this.x = rect.x;
	        this.y = rect.y;
	        this.w = rect.w;
	        this.h = rect.h;
	        this.union = this.__union2;
	    },
	    __union2: function(rect)
	    {
	        var a,b;
	        if(this.x>rect.x){
	            a = this.x-rect.x;
	            b = a+this.w;
	            this.w = (b>rect.w)?b:rect.w;
	            this.x = rect.x;
	        }else{
	            a = rect.x-this.x;
	            b = a+rect.w;
	            if(b>this.w){ this.w=b; }
	        }
	        if(this.y>rect.y){
	            a = this.y-rect.y;
	            b = a+this.h;
	            this.h = (b>rect.h)?b:rect.h;
	            this.y = rect.y;
	        }else{
	            a = rect.y-this.y;
	            b = a+rect.h;
	            if(b>this.h){ this.h=b; }
	        }
	    }
	};

	module.exports = function (x, y, w, h) {
	    return new Rectangle(x, y, w, h);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var noop = __webpack_require__(3),
	    inherit = __webpack_require__(8),
	    isTouch = __webpack_require__(9),
	    looptime = __webpack_require__(11),
	    scrollVector = __webpack_require__(12),
	    globalVector = __webpack_require__(14),
	    Matrix = __webpack_require__(5),
	    Vector = __webpack_require__(13),
	    Container = __webpack_require__(15),

	    animationFrame = (function (af)
	    {
	        if (!af) {
	            af = function (f) {
	                setTimeout(f, looptime);
	            }
	        }
	        return af;
	    })(
	        window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame
	    ),

	    Canvas = function (dom, w, h)
	    {
	        Container.call(this);

	        this.e = document.querySelector(dom);
	        if (!this.e || !this.e.getContext){
	            this.e = document.createElement('canvas');
	        }

	        this.e.width = w || this.e.width || 300;
	        this.e.height = h || this.e.height || 300;

	        this.ctx = this.e.getContext('2d');
	        if (this.ctx) {
	            this.canvas = this;
	        } else {
	            this.canvas = null;
	            this.draw = noop;
	        }

	        this.alpha = 1;
	        this.parent = 1;
	        this.mtx = Matrix();
	        this.vec = Vector();

	        this.__alpha = 1;
	        this.__order = 0;

	        this.__d = 0;
	        this.__itcvs = {};
	        this.__cache = {};

	        this.__setEvent();
	        this.resize(this.e.width, this.e.height);
	    };

	Canvas.prototype = {
	    resize: function (w, h, ratio) {
	        w = w || 300;
	        h = h || 300;
	        ratio = window.devicePixelRatio;

	        this.e.style.width = w + 'px';
	        this.e.style.height = h + 'px';
	        this.e.width = w * ratio;
	        this.e.height = h * ratio;
	        this.mtx.identity().scale(ratio, ratio);
	        this.update();
	    },
	    update:function()
	    {
	        if (!this.__d) {
	            this.__d = 1;
	            var self = this;
	            animationFrame(function(){ self.__update(); });
	        }
	        return this;
	    },
	    __update:function()
	    {
	        var c = this.ctx;
	        c.restore();
	        c.setTransform(1,0,0,1,0,0);
	        c.globalAlpha = this.__alpha = this.alpha;
	        c.clearRect(0, 0, this.e.width, this.e.height);

	        this.__d = 0;
	        this.__order = 0;
	        Container.prototype.__draw.call(this, c);
	    },
	    __setEvent:function()
	    {
	        var self = this,
	            e = this.e,
	            event;

	        if(isTouch){
	            event = function (e) {
	                self.__touchEvent(e);
	            };
	            e.addEventListener('touchstart', event);
	            e.addEventListener('touchmove', event);
	            e.addEventListener('touchend', function (e) {
	                self.__touchEnd(e)
	            });
	        }else{
	            event = function (e) {
	                self.__mouseEvent(e)
	            };
	            e.addEventListener('mousemove', event);
	            e.addEventListener('mousedown', event);
	            e.addEventListener('mouseup', event);
	        }
	    },
	    __dispatchEvent:function(e, type, x, y)
	    {
	        var order = -1,
	            p = globalVector(this.e),
	            id, v, itcv;

	        type = '__' + type;
	        p = this.mtx.trans(x - p.x, y - p.y);

	        for(id in this.__itcvs){
	            v = this.__itcvs[id];
	            if(v.order>order && v.interact(p, e)){
	                itcv = v;
	                order = v.order;
	            }
	        }

	        if(itcv){
	            itcv[type](e);
	        }
	    },
	    __mouseEvent:function(e)
	    {
	        var v = scrollVector();
	        this.__dispatchEvent(e, e.type, this.vec.x=e.clientX+v.x, this.vec.y=e.clientY+v.y);
	    },
	    __touchEvent:function(e)
	    {
	        this.__dispatchEvent(e, e.type, this.vec.x=e.touches[0].pageX, this.vec.y=e.touches[0].pageY);
	    },
	    __touchEnd: function (e) {
	        this.__dispatchEvent(e, e.type, this.vec.x, this.vec.y);
	    }
	};
	module.exports = inherit(Canvas, Container);

/***/ },
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var userAgentIs = __webpack_require__(10);
	module.exports = userAgentIs('iphone', 'ipod', 'ipad', 'android');

/***/ },
/* 10 */
/***/ function(module, exports) {

	var userAgent = window.navigator.userAgent.toLowerCase();

	module.exports = function () {
	    var i = 0, l = arguments.length;
	    for(i; i<l; i++) {
	        if (userAgent.indexOf(arguments[i]) > -1) {
	            return true;
	        }
	    }
	    return false;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = 40;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var vec = __webpack_require__(13)();

	module.exports = function () {
	    vec.x = window.scrollX;
	    vec.y = window.scrollY;
	    return vec;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Vector = __webpack_require__(13),
	    _get = function(par, vec2)
	    {
	        if(par){
	            vec2.x += par.offsetLeft;
	            vec2.y += par.offsetTop;
	            return _get(par.offsetParent, vec2);
	        }else{
	            return vec2;
	        }
	    };

	module.exports = function(dom)
	{
	    if(dom.offsetParent){
	        return _get(dom.offsetParent, Vector(dom.offsetLeft, dom.offsetTop));
	    }else{
	        return new Vector();
	    }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Cp = __webpack_require__(16),
	    Container = function ()
	    {
	        this.childs = [];
	        this.__childUpdater = Cp();
	        this.__canvasUpdater = Cp();
	    };

	Container.prototype = {
	    append: function ()
	    {
	        var i=0, l=arguments.length;
	        for (i; i<l; i++) {
	            this.__append(arguments[i]);
	        }
	        return this;
	    },
	    __append: function (child)
	    {
	        if (child.depth) {
	            child.parent.remove(child);
	        }
	        if (!child.__childUpdate) {
	            child.__childUpdate = function (ctx)
	            {
	                if (!child.hidden) {
	                    child.__draw(ctx);
	                }
	            };
	            child.__canvasUpdate = function (canvas)
	            {
	                if (canvas) {
	                    child.canvas = canvas;
	                    child.__addToCanvas(canvas);
	                } else {
	                    child.__removeFromCanvas(canvas);
	                    delete child.canvas;
	                }
	                if (child.__canvasUpdater) {
	                    child.__canvasUpdater.update([canvas]);
	                }
	            };
	        }

	        child.parent = this;
	        child.depth = this.childs.length;
	        this.childs.push(child);
	        this.__childUpdater.add(child.__childUpdate);
	        this.__canvasUpdater.add(child.__canvasUpdate);

	        if (this.canvas) {
	            child.__canvasUpdate(this.canvas);
	            this.canvas.update();
	        }
	        return this;
	    },
	    remove: function(child)
	    {
	        if (!child.parent) { return; }
	        child.__canvasUpdate();

	        this.__childUpdater.dispose(child.__childUpdate);
	        this.__canvasUpdater.dispose(child.__canvasUpdate);
	        this.childs.splice(child.depth, 1);
	        if (child.depth !== this.childs.length-1) {
	            this.__setOrder();
	        }

	        delete child.parent;
	        delete child.depth;

	        if (this.canvas) {
	            this.canvas.update();
	        }
	        return this;
	    },
	    __setOrder: function()
	    {
	        var l=this.childs.length, i, it;
	        for (i=l; i--;) {
	            it = this.childs[i];
	            it.depth = i;
	        }
	    },
	    __draw: function(c)
	    {
	        this.__childUpdater.update([c]);
	    }
	};

	module.exports = Container;

/***/ },
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(8),
	    Core = __webpack_require__(2),
	    View = function () {
	        Core.call(this);
	        this.alpha = 1;
	        this.__alpha = 1;
	        this.shadowColor = 'rgba(0,0,0,0)';
	        this.shadowBlur = 0;
	        this.shadowOffsetX = 0;
	        this.shadowOffsetY = 0;
	    };

	View.prototype = {
	    __draw:function(c){
	        Core.prototype.__draw.call(this, c);
	        c.globalAlpha = this.__alpha = this.parent.__alpha * this.alpha;
	        c.beginPath();

	        if(!this.shadowBlur && this.parent.shadowBlur){
	            var p = this.parent;
	            c.shadowColor = p.shadowBlur;
	            c.shadowBlur = p.shadowBlur;
	            c.shadowOffsetX = p.shadowOffsetX;
	            c.shadowOffsetY = p.shadowOffsetY;
	        }else{
	            c.shadowColor = this.shadowBlur ? this.shadowColor : 'rgba(0,0,0,0)';
	            c.shadowBlur = this.shadowBlur;
	            c.shadowOffsetX = this.shadowOffsetX;
	            c.shadowOffsetY = this.shadowOffsetY;
	        }

	        this.draw(c, this.bounds);
	    },
	    release:function(){
	        delete this.__alpha;
	        delete this.alpha;
	        delete this.shadowColor;
	        delete this.shadowBlur;
	        delete this.shadowOffsetX;
	        delete this.shadowOffsetY;
	    }
	};

	module.exports = inherit(View, Core);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(8),
	    View = __webpack_require__(17),
	    Container = __webpack_require__(15),

	    Sprite = function () {
	        View.call(this);
	        Container.call(this);
	    };

	Sprite.prototype = {
	    __draw:function(c){
	        View.prototype.__draw.call(this, c);
	        Container.prototype.__draw.call(this, c);
	    }
	};
	inherit(Sprite, View);
	inherit(Sprite, Container);

	module.exports = Sprite;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var noop = __webpack_require__(3),
	    isTouch = __webpack_require__(9),
	    inherit = __webpack_require__(8),
	    Notice = __webpack_require__(20),
	    View = __webpack_require__(17),
	    Matrix = __webpack_require__(5),

	    Responder = function () {
	        View.call(this);

	        this.imtx = Matrix();
	        this.order = 0;

	        this.isPointer = false;
	        this.mouseover = noop;
	        this.mouseout = noop;
	        this.mousedown = noop;
	        this.mousemove = noop;
	        this.mouseup = noop;
	        this.click = noop;

	        this.touchstart = noop;
	        this.touchmove = noop;
	        this.touchend = noop;

	        this.__flag = 0;
	        this.__notice = Notice();
	    };

	Responder.prototype = {
	    on: function (key, func) {
	        this.__notice.listen(key, func);
	        return this;
	    },
	    interact: function(p, e)
	    {
	        if(!this.canvas || this.isHidden()){ return false; }
	        return this.__interact(this.bounds.containsPoint(this.imtx.transPoint(p)), e);
	    },
	    __interact: function (bool, e) {
	        if (isTouch) {
	            return bool;
	        }

	        if (!this.__flag&1 && bool) {
	            this.mouseover(e);
	            this.__notice.publish('mouseover', [e]);
	            this.__flag |= 1;

	            if (this.isPointer) {
	                this.canvas.e.style.cursor = 'pointer';
	            }
	        }
	        if (this.__flag&1 && !bool) {
	            this.mouseout(e);
	            this.__notice.publish('mouseout', [e]);
	            this.__flag = 0;
	            //this.__flag ^= 1; maybe use it.

	            if (this.isPointer) {
	                this.canvas.e.style.cursor = null;
	            }
	        }
	        return bool;
	    },
	    __draw: function(c)
	    {
	        View.prototype.__draw.call(this, c);
	        this.imtx = this.mtx.clone().invert();
	        this.order = this.canvas.__order++;
	    },

	    __mousedown: function (e) {
	        this.mousedown(e);
	        this.__notice.publish('mousedown', [e]);
	        this.__flag |= 2;
	    },
	    __mousemove: function (e) {
	        this.mousemove(e);
	        this.__notice.publish('mousemove', [e]);
	    },
	    __mouseup: function (e) {
	        this.mouseup(e);
	        this.__notice.publish('mouseup', [e]);

	        if (this.__flag&2) {
	            this.click(e);
	            this.__notice.publish('click', [e]);
	            this.__flag ^= 2;
	        }
	    },

	    __touchstart: function (e) {
	        this.__flag |= 2;
	        this.touchstart(e);
	        this.__notice.publish('touchstart', [e]);
	    },
	    __touchmove: function (e) {
	        this.touchmove(e);
	        this.__notice.publish('touchmove', [e]);
	    },
	    __touchend: function (e) {
	        this.touchend(e);
	        this.__notice.publish('touchend', [e]);

	        if (this.__flag&2) {
	            this.__flag ^= 2;
	            this.click(e);
	            this.__notice.publish('click', [e]);
	        }
	    },

	    __addToCanvas: function()
	    {
	        this.canvas.__itcvs[this.id] = this;
	    },
	    __removeFromCanvas: function()
	    {
	        delete this.canvas.__itcvs[this.id];
	    },

	    release: function () {
	        View.prototype.release();

	        delete this.imtx;
	        delete this.order;
	        delete this.__flag;

	        delete this.mouseover;
	        delete this.mouseout;
	        delete this.mousedown;
	        delete this.mousemove;
	        delete this.mouseup;
	        delete this.click;
	    }
	};
	module.exports = inherit(Responder, View);



/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var
	    Cp = __webpack_require__(16),
	    Note;

	Note = function () {
	    this.cps = {};
	};
	Note.prototype = {
	    listen: function (key, func) {
	        var c = this.cps[key];
	        if (!c) {
	            c = this.cps[key] = Cp();
	        }
	        c.add(func);
	        return func;
	    },
	    clear: function (key, func) {
	        var c = this.cps[key];
	        if (!c) { return; }
	        c.remove(func);
	    },
	    publish: function (key, obj) {
	        var c = this.cps[key];
	        if (!c) { return; }
	        c.update(obj);
	    },
	    release: function () {
	        var p;
	        for (p in this.cps) {
	            this.cps[p].release();
	        }
	        delete this.cps;
	    }
	};

	module.exports = function () {
	    return new Note();
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function (value)
	{
	    return Math.PI*value/180;
	};


/***/ }
/******/ ]);