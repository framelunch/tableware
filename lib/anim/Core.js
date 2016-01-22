var
    loop = require('../core/loop'),
    noop = require('../utils/noop'),
    step = require('../utils/looptime'),

    Element = require('./wrap/Element'),
    Window = require('./wrap/Window'),

    cache = {},
    win = null,
    id = 1,

    Core = function () {
        this.status = 0;
        this.__onplay = noop;
        this.__onupdate = noop;
        this.__onpause = noop;
        this.__onend = noop;

        var self = this, stp = step;
        this.__update = function () {
            self.update(stp);
        };
    };

Core.target = function (tar) {
    if (typeof tar === 'string')
    {
        tar = cache[tar] = cache[tar] || Element(tar);
    }
    else if (typeof tar.getAttribute === 'function') {
        if (tar.___tw___) {
            tar = Core.__cache[tar.___tw___];
        } else {
            tar = Core.__cache[tar.___tw___ = id] = Element(tar);
            id++;
        }
    }
    else if (typeof tar.scrollTo === 'function') {
        tar = win || (win = Window(tar));
    }
    return tar;
};

Core.prototype = {
    sync: function (name, fc) {
        if (typeof name === 'object') {
            if (typeof name.play === 'function') { this.__onplay = name.play; }
            if (typeof name.pause === 'function') { this.__onpause = name.pause; }
            if (typeof name.update === 'function') { this.__onupdate = name.update; }
            if (typeof name.end === 'function') { this.__onend = name.end; }
        } else {
            switch(name) {
                case 'play': this.__onplay = fc || noop; break;
                case 'pause': this.__onpause = fc || noop; break;
                case 'update': this.__onupdate = fc || noop; break;
                case 'end': this.__onend = fc || noop; break;
            }
        }
        return this;
    },
    play:function(){
        this.status = 1;
        this.__onplay();
        loop.add(this.__update);
        return this;
    },
    pause:function(){
        if(this.status<1) { return false; }
        this.status = 2;
        this.__onpause();
        loop.remove(this.__update);
        return true;
    },
    resume:function(){
        if(this.status<2){ return false; }
        this.status = 1;
        loop.add(this.__update);
        return true;
    },
    end:function(){
        this.status = 0;
        loop.remove(this.__update);
        this.__onupdate();
        this.__onend();
    },
    update: noop
};
module.exports = Core;