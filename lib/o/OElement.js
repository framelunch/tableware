var
    inherit = require('../utils/inherit'),
    set = require('../utils/set'),

    Element = require('../anim/wrap/Element'),
    OAll = require('./OAll'),

    OElement = function (tar, val)
    {
        Element.call(this, tar);
        this._classList = this.e.className ? this.e.className.split(' ') : [];

        if (val) {
            this.set(val);
        }
        if (typeof this.id === 'string') {
            OElement.__cache[this.id] = this;
        }
    };

OElement.__cache = {};
OElement.prototype = {
    select: function (id)
    {
        return new OElement(id);
    },
    selectAll: function (id)
    {
        return new OAll(this.e.querySelectorAll(id));
    },
    set: function (val)
    {
        set(this, val);
        this.update();
        return this;
    },

    addClass: function (val)
    {
        if (this._classList.indexOf(val) === -1) {
            this._classList.push(val);
            this.e.className = this._classList.join(' ');
        }
    },
    removeClass: function (val)
    {
        for(var i=this._classList.length; i--;) {
            if (this._classList[i] === val) {
                this._classList.splice(i, 1);
                break;
            }
        }
        this.e.className = this._classList.join(' ');
    },

    append: function ()
    {
        var i=0, l=arguments.length, item;
        for (i; i<l; i++) {
            item = arguments[i];
            if (typeof item === 'string') {
                this.e.innerHTML += item;
            } else {
                this.e.appendChild(item.e)
            }
        }
        return this;
    },
    appendTo: function (tar)
    {
        tar.append(this);
        return this;
    },

    remove: function (tar)
    {
        var i=0, l=arguments.length, item;
        for (i; i<l; i++) {
            item = arguments[i];
            this.e.removeChild(item.e);
        }
        return this;
    },
    removeFrom: function (tar)
    {
        tar.remove(this);
        return this;
    },

    on: function (key, func)
    {
        this.tar.addEventListener(key, func);
    },
    off: function (key, func)
    {
        this.tar.removeEventListener(key, func);
    }
};

module.exports = inherit(OElement, Element);