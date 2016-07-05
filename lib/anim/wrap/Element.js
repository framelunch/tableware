'use strict';

var
    noop = require("../../utils/noop"),
    getStyle = require('../../utils/getStyle'),
    setStyle = require('../../utils/setStyle'),
    getHidden = require('../../utils/getHidden'),
    setHidden = require('../../utils/setHidden'),

    angle = require("../../utils/angle"),
    degree = require('../../utils/degree'),
    userAgentIs = require('../../utils/userAgentIs'),
    Matrix = require('../../geo/Matrix'),
    _trans = userAgentIs('ie 9') ? '-ms-transform' : 'transform',

    Element = function (e) {
        this.e = e;
        this.trans = (e.transform && e.tagName.toLowerCase() !== 'svg')
            ? this.__transWithAttr : this.__transWithCss;
        this.style = e.style;
        this.hasInit = true;
        this.hasUpdate = true;

        this._x = 0;
        this._y = 0;
        this._sx = 1;
        this._sy = 1;
        this._r = 0;
        this._deg = 0;
        
        var arr = (window.getComputedStyle(this.e, '')
            .getPropertyValue('transform') || 'matrix(1,0,0,1,0,0)')
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

        Object.defineProperty(this, 'x', {get: this.getX, set: this.setX});
        Object.defineProperty(this, 'y', {get: this.getY, set: this.setY});
        Object.defineProperty(this, 'sx', {get: this.getSx, set: this.setSx});
        Object.defineProperty(this, 'sy', {get: this.getSy, set: this.setSy});
        Object.defineProperty(this, 'r', {get: this.getR, set: this.setR});
        Object.defineProperty(this, 'degree', {get: this.getDegree, set: this.setDegree});

        Object.defineProperty(this, 'opacity', {get: this.getOpacity, set: this.setOpacity});
        Object.defineProperty(this, 'width', {get: this.getWidth, set: this.setWidth});
        Object.defineProperty(this, 'height', {get: this.getHeight, set: this.setHeight});

        Object.defineProperty(this, 'scrollTop', {get: this.getScrollTop, set: this.setScrollTop});
        Object.defineProperty(this, 'scrollLeft', {get: this.getScrollLeft, set: this.setScrollLeft});
        Object.defineProperty(this, 'hidden', {get: this.getHidden, set: this.setHidden});
    };

Element.prototype = {
    init: function () {
      this.update = noop;
    },
    __update: function () {
        var m = this.mtx.clone()
            .scale(this._sx, this._sy)
            .rotate(this._r)
            .translate(this._x, this._y);
        
        this.trans('matrix('+m.a+', '+m.b+', '+m.c+', '+m.d+', '+m.tx+','+m.ty+')');
    },
    __transWithCss: function (mtx) {
        this.style[_trans] = mtx;
    },
    __transWithAttr: function (mtx) {
        this.e.setAttribute('transform', mtx);
    },

    attr: function (obj) {
        var p;
        for(p in obj) {
            this.e.setAttribute(p, obj[p]);
        }
        return this;
    },
    _attr: function (str) {
        return this.e.getAttribute(str);
    },

    css: function (obj) {
        setStyle(this.e, obj);
        return this;
    },
    _css: function (str) {
        return getStyle(this.e, str);
    },

    getX: function () {
        this.update = this.__update;
        return this._x;
    },
    setX: function (val) { this._x = val; },
    getY: function () {
        this.update = this.__update;
        return this._y;
    },
    setY: function (val) { this._y = val; },
    getSx: function () {
        this.update = this.__update;
        return this._sx;
    },
    setSx: function (val) { this._sx = val; },
    getSy: function () {
        this.update = this.__update;
        return this._sy;
    },
    setSy: function (val) { this._sy = val; },
    getR: function () {
        this.update = this.__update;
        return this._r;
    },
    setR: function (val) {
        this._r = val;
    },
    getDegree: function () {
        this.update = this.__update;
        return this._deg = angle(this.r);
    },
    setDegree: function (val) {
        this.r = degree(val);
        this._deg = val;
    },

    getOpacity: function () {
        return getStyle(this.e, 'opacity');
    },
    setOpacity: function (val) {
        this.style.opacity = val;
    },
    getWidth: function () {
        return getStyle(this.e, 'width');
    },
    setWidth: function (val) {
        this.style.width = val + 'px';
    },
    getHeight: function () {
        return getStyle(this.e, 'height');
    },
    setHeight: function (val) {
        this.style.height = val + 'px';
    },

    getScrollTop: function () {
        return this.e.scrollTop;
    },
    setScrollTop: function (val) {
        this.e.scrollTop = val;
    },

    getScrollLeft: function () {
        return this.e.scrollLeft;
    },
    setScrollLeft: function (val) {
        this.e.scrollLeft = val;
    },

    getHidden: function() {
        return getHidden(this.e);
    },
    setHidden: function(val) {
        setHidden(this.e, val);
    }
};
module.exports = Element;