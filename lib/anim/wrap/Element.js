var
    isEmpty = require('../../utils/isEmpty'),
    getStyle = require('../../utils/getStyle'),
    setStyle = require('../../utils/setStyle'),
    getHidden = require('../../utils/getHidden'),
    setHidden = require('../../utils/setHidden'),

    degree = require('../../utils/degree'),
    userAgentIs = require('../../utils/userAgentIs'),
    Matrix = require('../../geo/Matrix'),
    _trans = userAgentIs('ie 9') ? '-ms-transform' : 'transform',

    Element = function (e) {
        this.e = e;
        this.trans = e.transform ? this.__transWithAttr : this.__transWithCss;
        this.style = e.style;
        this.hasUpdate = true;

        this.x = 0;
        this.y = 0;
        this.sx = 1;
        this.sy = 1;
        this.r = 0;
        this._deg = 0;

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
        this.style[_trans] = mtx;
    },
    __transWithAttr: function (mtx) {
        this.e.setAttribute('transform', mtx);
    },

    attr: function (val) {
        if (typeof val === 'string') {
            return this.e.getAttribute(val);
        } else {
            for(var p in val) {
                this.e.setAttribute(p, val[p]);
            }
            return this;
        }
    },

    css: function (val) {
        if (typeof val === 'string') {
            return getStyle(this.e, val);
        } else {
            setStyle(this.e, val);
            return this;
        }
    },

    hidden: function (bool) {
        if (isEmpty(bool)) {
            return getHidden(this.e);
        } else {
            setHidden(this.e, bool);
            return this;
        }
    },

    degree: function (v) {
        if (isEmpty(v)) {
            return this._deg;
        } else {
            this.r = degree(v);
            this._deg = v;
            return this;
        }
    },

    scrollTop: function (v) {
        if (isEmpty(v)) {
            return this.e.scrollTop;
        } else {
            this.e.scrollTop = v;
            return this;
        }
    },
    scrollLeft: function (v) {
        if (isEmpty(v)) {
            return this.e.scrollLeft;
        } else {
            this.e.scrollLeft = v;
            return this;
        }
    }
};
module.exports = Element;