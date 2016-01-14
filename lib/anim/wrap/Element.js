var
    merge = require('utils/merge'),
    degree = require('utils/degree'),
    Matrix = require('../../geo/Matrix'),

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
