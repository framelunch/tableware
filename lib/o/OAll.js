var
    OElement = require('./OElement'),
    OAll = function (arr, val) {
        this.a = [];
        var i =0, l =arr.length;
        for(i; i<l; i++) {
            this.a.push(new OElement(arr[i], val));
        }
    };

OAll.prototype = {
    set: function (val)
    {
        var i =0, l=this.a.length;
        for(i; i<l; i++) {
            this.a[i].set(val);
        }
    },
    hidden: function (bool)
    {
        var i =0, l=this.a.length;
        for(i; i<l; i++) {
            this.a[i].hidden(bool);
        }
    },
    attr: function (val)
    {
        var i =0, l=this.a.length;
        for(i; i<l; i++) {
            this.a[i].attr(val);
        }
    },
    css: function (val)
    {
        var i =0, l=this.a.length;
        for(i; i<l; i++) {
            this.a[i].css(val);
        }
    },
    on: function (key, func)
    {
        var i =0, l=this.a.length;
        for(i; i<l; i++) {
            this.a[i].on(key, func);
        }
    },
    off: function (key, func)
    {
        var i =0, l=this.a.length;
        for(i; i<l; i++) {
            this.a[i].off(key, func);
        }
    }
};

module.exports = OAll;