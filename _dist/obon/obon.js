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
	window.obon = obon;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var
	    merge = __webpack_require__(2),
	    degree = __webpack_require__(3),

	    ease = __webpack_require__(4),
	    Tween = __webpack_require__(15),
	    Serial = __webpack_require__(27),
	    Parallel = __webpack_require__(28),
	    Delay = __webpack_require__(29),
	    Func = __webpack_require__(30),
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

	main.degree = degree;
	module.exports = merge(main, ease);

/***/ },
/* 2 */
/***/ function(module, exports) {

	var main = function (to, from) {
	    var name, value, target;
	    for(name in from) {
	        value = from[name];
	        target = to[name];
	        if (typeof target === 'object') {
	            main(to[name], value);
	        }
	        else if(typeof target === 'function' && typeof value !== 'function') {
	            to[name](value);
	        }
	        else {
	            to[name] = value;
	        }
	    }
	    return to;
	};

	module.exports = main;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function (value)
	{
	    return Math.PI*value/180;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Back = __webpack_require__(5),
	    Bounce = __webpack_require__(6),
	    Circ = __webpack_require__(7),
	    Cubic = __webpack_require__(8),
	    Elastic = __webpack_require__(9),
	    Expo = __webpack_require__(10),
	    Quad = __webpack_require__(11),
	    Quart = __webpack_require__(12),
	    Quint = __webpack_require__(13),
	    Sine = __webpack_require__(14);

	module.exports = {
	    Linear: function(t,b,c,d){ return c * t / d + b; },

	    BackIn: Back.in,
	    BackOut: Back.out,
	    BackInOut: Back.inout,
	    BackOutIn: Back.outin,
	    BackInWith: Back.inWith,
	    BackOutWith: Back.outWith,
	    BackInOutWith: Back.inoutWith,
	    BackOutInWith: Back.outinWith,

	    BounceIn: Bounce.in,
	    BounceOut: Bounce.out,
	    BounceInOut: Bounce.inout,
	    BounceOutIn: Bounce.outin,

	    CircIn: Circ.in,
	    CircOut: Circ.out,
	    CircInOut: Circ.inout,
	    CircOutIn: Circ.outin,

	    CubicIn: Cubic.in,
	    CubicOut: Cubic.out,
	    CubicInOut: Cubic.inout,
	    CubicOutIn: Cubic.outin,

	    ElasticIn: Elastic.in,
	    ElasticOut: Elastic.out,
	    ElasticInOut: Elastic.inout,
	    ElasticOutIn: Elastic.outin,
	    ElasticInWith: Elastic.inWith,
	    ElasticOutWith: Elastic.outWith,
	    ElasticInOutWith: Elastic.inoutWith,
	    ElasticOutInWith: Elastic.outinWith,

	    ExpoIn: Expo.in,
	    ExpoOut: Expo.out,
	    ExpoInOut: Expo.inout,
	    ExpoOutIn: Expo.outin,

	    QuadIn: Quad.in,
	    QuadOut: Quad.out,
	    QuadInOut: Quad.inout,
	    QuadOutIn: Quad.outin,

	    QuartIn: Quart.in,
	    QuartOut: Quart.out,
	    QuartInOut: Quart.inout,
	    QuartOutIn: Quart.outin,

	    QuintIn: Quint.in,
	    QuintOut: Quint.out,
	    QuintInOut: Quint.inout,
	    QuintOutIn: Quint.outin,

	    SineIn: Sine.in,
	    SineOut: Sine.out,
	    SineInOut: Sine.inout,
	    SineOutIn: Sine.outin
	};


/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var
	    loop = __webpack_require__(16),
	    noop = __webpack_require__(19),
	    rgba = __webpack_require__(20),
	    degree = __webpack_require__(3),
	    rgbaDiff = __webpack_require__(21),
	    inherit = __webpack_require__(22),

	    Core = __webpack_require__(23),
	    Element = __webpack_require__(24),
	    Window = __webpack_require__(26),
	    easing = __webpack_require__(4),
	    window = null,
	    id = 1,

	    Tween = function (tar, to, from, time, ease) {
	        if(!to && !from){ throw 'invalid parameter!'; return; }

	        if (typeof tar === 'string')
	        {
	            tar = Tween.__cache[tar] = Tween.__cache[tar] || Element(tar);
	        }
	        else if (typeof tar.getAttribute === 'function') {
	            if (tar.___tw___) {
	                tar = Tween.__cache[tar.___tw___];
	            } else {
	                tar = Tween.__cache[tar.___tw___ = id] = Element(tar);
	                id++;
	            }
	        }
	        else if (typeof tar.scrollTo === 'function') {
	            tar = window || (window = Window(tar));
	        }

	        Core.call(this);
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

	Tween.__cache = {};

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
	        this['_' + this.len] = {t: tar, p:func, c: c, b: b, d: d};
	    },
	    __functionWithObject: function (tar, p, to, from, params) {
	        var b, d, c, v, func = tar[p], g = {};
	        b = typeof from[p] === 'function' ? {} : from[p];
	        d = typeof to[p] === 'function' ? {} : to[p];
	        c = {};

	        for (var n in params) {
	            if (/#|rgb/.test(params[n])) {
	                v = func.call(tar, n);
	                b[n] = rgba(b[n] || v);
	                d[n] = d[n] || v;
	                c[n] = rgbaDiff(rgba(d[n]), b[n]);
	                g[n] = this.__getColor;
	            } else {
	                v = parseFloat(func.call(tar, n));
	                b[n] = b[n] || v;
	                d[n] = d[n] || v;
	                c[n] = d[n] - b[n];
	                g[n] = this.__getValue;
	            }
	        }

	        this['_t' + this.len] = this.__twfuncWithObj;
	        this['_f' + this.len] = this.__fixfunc;
	        this['_' + this.len] = {t: tar, p:func, c: c, b: b, d: d, s:{}, g:g};
	    },
	    __string: function (tar, p, to, from, params) {
	        if (/#|rgb/.test(params)) {
	            this.__color(tar, p, to, from, params);
	            return;
	        }

	        var b, d, c;
	        b = (b = from[p]) === '' ? 0 : parseFloat(b);
	        d = (c = to[p]) === '' ? 0 : parseFloat(c);
	        c = d - b;
	        if(tar instanceof CSSStyleDeclaration && /top|bottom|left|right|width|height/.test(p)){
	            this['_t' + this.len] = this.__twpx;
	            this['_f' + this.len] = this.__fixpx;
	        }else{
	            this['_t' + this.len] = this.__tw;
	            this['_f' + this.len] = this.__fix;
	        }
	        this['_' + this.len] = {t: tar, p: p, c: c, b: b, d: d};
	    },
	    __color: function (tar, p, to, from) {
	        var b, d, c;
	        b = rgba(from[p]);
	        d = to[p];
	        c = rgbaDiff(rgba(d), b);

	        this['_t' + this.len] = this.__twcolor;
	        this['_f' + this.len] = this.__fix;
	        this['_' + this.len] = {t: tar, p: p, c: c, b: b, d: d};
	    },
	    __number: function (tar, p, to, from) {
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
	    __degree: function (tar, p, to, from) {
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var
	    cp = __webpack_require__(17)(),
	    time = __webpack_require__(18),
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
/* 17 */
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
/* 18 */
/***/ function(module, exports) {

	module.exports = 40;


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(){ return null; };


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function (str) {
	    if (str.charAt(0) === '#') {
	        return {
	            r: parseInt('0x' + str.substr(1, 2)),
	            g: parseInt('0x' + str.substr(3, 2)),
	            b: parseInt('0x' + str.substr(5, 2)),
	            a: 1
	        };
	    } else {
	        var arr = str.match(/\d+(\.\d+)?/g);
	        return {
	            r: parseInt(arr[0]),
	            g: parseInt(arr[1]),
	            b: parseInt(arr[2]),
	            a: parseFloat(arr[3] || 1)
	        }
	    }
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function (a, b) {
	    var obj = {};
	    for(var par in a) {
	        obj[par] = a[par] - b[par];
	    }
	    return obj;
	};


/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var
	    loop = __webpack_require__(16),
	    noop = __webpack_require__(19),
	    step = __webpack_require__(18),

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var
	    merge = __webpack_require__(2),
	    degree = __webpack_require__(3),
	    Matrix = __webpack_require__(25),

	    Element = function (e) {
	        this.e = typeof e === 'string' ? document.querySelector(e) : e;
	        this.trans = this.e.transform ? this.__transWithAttr : this.__transWithCss;
	        this.style = this.e.style;

	        var arr = window.getComputedStyle(this.e, '')
	            .getPropertyValue('transform')
	            .match(/\d+(\.\d+)?/g);

	        this.mtx =
	            arr ? Matrix(
	                parseFloat(arr[0]),
	                parseFloat(arr[1]),
	                parseFloat(arr[2]),
	                parseFloat(arr[3]),
	                parseFloat(arr[4]),
	                parseFloat(arr[5])
	            ) : Matrix();

	        this.x = 0;
	        this.y = 0;
	        this.r = 0;
	        this._deg = 0;
	        this.sx = 1;
	        this.sy = 1;
	        this.hasUpdate = true;
	    };

	Element.prototype = {
	    update: function () {
	        var m = this.mtx.clone()
	            .scale(this.sx, this.sy)
	            .rotate(this.r)
	            .translate(this.x, this.y);

	        this.trans('matrix('+m.a+', '+m.b+', '+m.c+', '+m.d+', '+m.tx+','+m.ty+')');
	    },
	    __transWithCss: function (mtx) {
	        this.style.transform = mtx;
	    },
	    __transWithAttr: function (mtx) {
	        this.e.setAttribute('transform', mtx);
	    },

	    css: function (attr) {
	        if (typeof attr === 'string') {
	            return window.getComputedStyle(this.e, '')
	                .getPropertyValue(attr) || this.style[attr];
	        } else {
	            for(var p in attr) {
	                this.style[p] = attr[p] +
	                    (/top|bottom|left|right|width|height/.test(p) ? 'px' : '');
	            }
	        }
	    },
	    attr: function (attr) {
	        if (typeof attr === 'string') {
	            return this.e.getAttribute(attr);
	        } else {
	            for(var p in attr) {
	                this.e.setAttribute(p, attr[p]);
	            }
	        }
	    },
	    degree: function (v) {
	        if (v) {
	            this.r = degree(v);
	            this._deg = v;
	        } else {
	            return this._deg;
	        }
	    },
	    scrollTop: function (v) {
	        if (v) {
	            this.e.scrollTop = v;
	        } else {
	            return this.e.scrollTop;
	        }
	    },
	    scrollLeft: function (v) {
	        if (v) {
	            this.e.scrollLeft = v;
	        } else {
	            return this.e.scrollLeft;
	        }
	    }
	};

	module.exports = function (e) {
	    return new Element(e);
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

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
/* 26 */
/***/ function(module, exports) {

	var
	    Window = function (e) {
	        this.e = e;
	        this.scrollTop = e.scrollY;
	        this.scrollLeft = e.scrollX;
	        this.hasUpdate = true;
	    };

	Window.prototype = {
	    update: function () {
	        this.e.scrollTo(this.scrollLeft, this.scrollTop);
	    }
	};

	module.exports = function (e) {
	    return new Window(e);
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(22),
	    Core = __webpack_require__(23),
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(22),
	    Core = __webpack_require__(23),
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var inherit = __webpack_require__(22),
	    loop = __webpack_require__(16),
	    Core = __webpack_require__(23),

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var noop = __webpack_require__(19),
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