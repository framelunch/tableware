'use strict';

var
    isEmpty = require('../utils/isEmpty'),
    set = require('../utils/set'),
    setStyle = require('../utils/setStyle'),
    getStyle = require('../utils/getStyle'),
    setHidden = require('../utils/setHidden'),
    getHidden = require("../utils/getHidden"),

    Oe = function (tars) {
        var i= 0, l=tars.length;
        for(i; i<l; i++) {
            this[i] = tars[i];
        }
        this.length = l;
    };

Oe.prototype = {
    init: function (val) {
        if (val) {
            set(this, val);
        }
        return this;
    },
    each: function (func) {
        var i=0, l=this.length;
        for (i; i<l; i++) {
            func(this[i], i, this);
        }
        return this;
    },
    find: function (q, val) {
        var arr = [];
        this.each(function (item) {
            var d = item.querySelectorAll(q),
                i = 0,
                l = d.length;

            for(i; i<l; i++) {
                arr.push(d[i]);
            }
        });
        return (new Oe(arr)).init(val);
    },
    attr: function (val) {
        if (typeof val === 'string') {
            return this.length ? this[0].getAttribute(val) : undefined;
        } else {
            this.each(function (item) {
                for(var p in val) {
                    item.setAttribute(p, val[p]);
                }
            });
            return this;
        }
    },
    css: function (val) {
        if (typeof val === 'string') {
            return this.length ? getStyle(this[0], val) : undefined;
        } else {
            this.each(function (item) {
                setStyle(item, val);
            });
            return this;
        }
    },
    scrollTop: function (val) {
        if (isEmpty(val)) {
            return this.length ? this[0].scrollTop : 0;
        } else {
            this.each(function (item) {
                item.scrollTop = val;
            });
            return this;
        }
    },
    scrollLeft: function (val) {
        if (isEmpty(val)) {
            return this.length ? this[0].scrollLeft : 0;
        } else {
            this.each(function (item) {
                item.scrollLeft = val;
            });
            return this;
        }
    },
    hidden: function (val) {
        if (isEmpty(val)) {
            return this.length ? getHidden(this[0]) : false;
        } else {
            this.each(function (item) {
                setHidden(item, val);
            });
            return this;
        }
    },
    show: function () { this.hidden(false); },
    hide: function () { this.hidden(true); },

    text: function (val) {
        if (isEmpty(val)) {
            return this.length ? this[0].innerText : '';
        } else {
            this.each(function (item) {
                item.innerText = val;
            });
            return this;
        }
    },
    html: function (val) {
        if (isEmpty(val)) {
            return this.length ? this[0].innerHTML : '';
        } else {
            this.each(function (item) {
                item.innerHTML = val;
            });
            return this;
        }
    },
    val: function (val) {
        if (isEmpty(val)) {
            return this.length ? this[0].value : '';
        } else {
            this.each(function (item) {
                item.value = val;
            });
            return this;
        }
    },
    disabled: function (bool) {
        if (isEmpty(bool)) {
            return this.length ? this[0].disabled : false;
        } else {
            this.each(function (item) {
                item.disabled = bool;
            });
            return this;
        }
    },
    index: function () {
        if (this.length) {
            var item = this[0];
            return Array.prototype.indexOf.call(item.parentNode.childNodes, item);
        } else {
            return 0;
        }
    },
    width: function (val) {
        if (isEmpty(val)) {
            return this.css('width');
        } else {
            this.css({width: val});
            return this;
        }
    },
    height: function (val) {
        if (isEmpty(val)) {
            return this.css('height');
        } else {
            this.css({height: val});
            return this;
        }
    },
    clientWidth: function () {
        return this.length ? this[0].clientWidth : 0;
    },
    clientHeight: function () {
        return this.length ? this[0].clientHeight : 0;
    },
    offsetWidth: function () {
        return this.length ? this[0].offsetWidth : 0;
    },
    offsetHeight: function () {
        return this.length ? this[0].offsetHeight : 0;
    },

    clone: function (val) {
        var arr = [];
        this.each(function (item) {
            arr.push(item.cloneNode(true));
        });
        return (new Oe(arr)).init(val);
    },
    addClass: function (val) {
        this.each(function (item) {
            var c = item.className;
            if (c.indexOf(val) === -1) {
                var arr = c.split(' ');
                arr.push(val);
                item.className = arr.join(' ');
            }
        });
        return this;
    },
    removeClass: function (val) {
        this.each(function (item) {
            var arr = item.className.split(' '),
                i = arr.length;
            for(i; i--;) {
                if (arr[i] === val) {
                    arr.splice(i, 1);
                    break;
                }
            }
            item.className = arr.join(' ');
        });
        return this;
    },

    on: function (key, func) {
        this.each(function (item) {
            item.addEventListener(key, func);
        });
        return this;
    },
    off: function (key, func) {
        this.each(function (item) {
            item.removeEventListener(key, func);
        });
        return this;
    },

    append: function () {
        if (this.length) {
            var i = 0,
                l = arguments.length,
                parent = this[0],
                o;

            for(i; i<l; i++) {
                o = arguments[i];
                if (typeof o === 'string') {
                    this.html(this.html() + o);
                } else {
                    o.each(function (item) {
                        parent.appendChild(item);
                    });
                }
            }
        }
        return this;
    },
    remove: function () {
        if (arguments.length && this.length) {
            var i = 0, l = arguments.length, parent = this[0];
            for(i; i<l; i++) {
                arguments[i].each(function (item) {
                    parent.removeChild(item);
                });
            }
        } else {
            this.each(function (item) {
                item.parentNode.removeChild(item);
            });
        }
    }
};

module.exports = Oe;