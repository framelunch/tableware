var noop = require('../utils/noop'),
    isTouch = require('../utils/isTouch'),
    inherit = require('../utils/inherit'),
    Notice = require('../core/Notice'),
    Matrix = require('../core/Matrix'),
    View = require('./View'),

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

