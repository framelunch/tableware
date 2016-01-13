var noop = require('../utils/noop'),
    Func = function (fc, args) {
        this.fc = typeof(fc)==='function' ? fc : noop;
        this.args = args || [];
        this.__onend = noop;
    };

Func.prototype = {
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
        this.fc.apply(null, this.args);
        this.__onend();
    }
};
module.exports = Func;
