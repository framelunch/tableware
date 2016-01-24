var noop = require('../utils/noop'),
    set = require('../utils/set'),
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
    __set: set
};
module.exports = To;