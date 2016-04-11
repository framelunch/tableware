'use strict';

var inherit = require('../utils/inherit'),
    loop = require('../utils/loop'),
    Core = require('./Core'),

    Delay = function (tw, delay) {
        Core.call(this);
        tw.pause();
        this.tw = tw;
        this.delay = delay;

        var self = this;
        this.tw.__onend = function () {
            if(self.status!==1){ Core.prototype.end.call(self); }
        };
    };

Delay.prototype = {
    play:function()
    {
        this.t = 0;
        this.tw.__onupdate = this.__onupdate;
        this.tw.__onpause = this.__onpause;
        Core.prototype.play.call(this);
        return this;
    },
    pause:function()
    {
        if(this.delay===this.t){
            this.tw.pause();
        }else{
            Core.prototype.pause.call(this);
        }
    },
    resume:function()
    {
        if(this.delay===this.t){
            this.tw.resume();
        }else{
            Core.prototype.resume.call(this);
        }
    },
    end:function()
    {
        this.status = 0;
        this.tw.end();
    },
    update:function(step)
    {
        if(this.delay-this.t<step){
            this.t = this.delay;
            loop.remove(this.__update);
            this.status = 0;
            this.tw.play();
        }else{
            this.t += step;
        }
    }
};
module.exports = inherit(Delay, Core);
