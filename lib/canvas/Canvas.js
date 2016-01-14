var noop = require('../utils/noop'),
    inherit = require('../utils/inherit'),
    isTouch = require('../utils/isTouch'),
    looptime = require('../utils/looptime'),
    scrollVector = require('../utils/scrollVector'),
    globalVector = require('../utils/globalVector'),
    Matrix = require('../geo/Matrix'),
    Vector = require('../geo/Vector'),
    Container = require('./Container'),

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

        this.hasUpdate = true;// for tween animation
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