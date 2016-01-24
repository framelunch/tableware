var
    degree = require('../../utils/degree'),
    userAgentIs = require('../../utils/userAgentIs'),
    Matrix = require('../../geo/Matrix'),
    cssTrans = userAgentIs('ie 9') ? '-ms-transform' : 'transform',

    Element = function (e) {
        this.e = typeof e === 'string' ? document.querySelector(e) : e;
        this._trans = this.e.transform ? this.__transWithAttr : this.__transWithCss;
        this._style = this.e.style;

        var sty = window.getComputedStyle(this.e, ''),
            arr = sty.getPropertyValue('transform').match(/\d+(\.\d+)?/g);

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
        this.sx = 1;
        this.sy = 1;
        this.r = 0;
        this._deg = 0;
        this._display = sty.getPropertyValue('display');
        this.hasUpdate = true;
    };

Element.prototype = {
    update: function () {
        var m = this.mtx.clone()
            .scale(this.sx, this.sy)
            .rotate(this.r)
            .translate(this.x, this.y);

        this._trans('matrix('+m.a+', '+m.b+', '+m.c+', '+m.d+', '+m.tx+','+m.ty+')');
    },
    __transWithCss: function (mtx) {
        this._style[cssTrans] = mtx;
    },
    __transWithAttr: function (mtx) {
        this.e.setAttribute('transform', mtx);
    },

    attr: function (v) {
        if (typeof v === 'string') {
            return this.e.getAttribute(v);
        } else {
            for(var p in v) {
                this.e.setAttribute(p, v[p]);
            }
            return this;
        }
    },

    css: function (v) {
        if (typeof v === 'string') {
            var s = window.getComputedStyle(this.e, '').getPropertyValue(v) || this._style[v];
            return /top|bottom|left|right|width|height/.test(v) ? parseFloat(s) : s;
        } else {
            for(var p in v) {
                this._style[p] = v[p] +
                    (/top|bottom|left|right|width|height/.test(p) ? 'px' : '');
            }
            return this;
        }
    },
    hidden: function (bool) {
        if (bool === null || bool === undefined) {
            return this._style.display === 'none';
        } else {
            this._style.display = (bool ? 'none' : this._display);
            return this;
        }
    },

    degree: function (v) {
        if (v) {
            this.r = degree(v);
            this._deg = v;
            return this;
        } else {
            return this._deg;
        }
    },

    scrollTop: function (v) {
        if (v) {
            this.e.scrollTop = v;
            return this;
        } else {
            return this.e.scrollTop;
        }
    },
    scrollLeft: function (v) {
        if (v) {
            this.e.scrollLeft = v;
            return this;
        } else {
            return this.e.scrollLeft;
        }
    }
};

module.exports = Element;