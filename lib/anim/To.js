var noop = require('../utils/noop'),
    Core = require('./Core'),
    To = function (tar, to) {
        this.tar = Core.target(tar);
        this.to = to;
        this.__onend = noop;
    };

To.prototype = {
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
        this.__set(this.tar, this.to);
        this.__onend();
    },

    __set: function (tar, to) {
        var func, p;

        for(p in to) {
            if (func = this['__' + typeof tar[p]]) {
                func.call(this, tar, p, to[p]);
            }
        }
    },
    __object: function (tar, name, value) {
        this.__set(tar[name], value);
    },
    __function: function (tar, name, value) {
        tar[name].call(tar, value);
    },
    __string: function (tar, name, value) {
        tar[name] = value;
    },
    __number: function (tar, name, value) {
        tar[name] = value;
    }
};
module.exports = To;