var inherit = require('../utils/inherit'),
    Core = require('./Core'),
    Parallel = function (args) {
        Core.call(this);
        this.list = args;
        this.len = args.length;
        this.i = 0;

        for(var i=this.len,s=this; i--;){
            this.list[i].pause();
            this.list[i].__onend = function(){
                if(s.status===-1){ return; }
                if((++s.i)===s.len){ Core.prototype.end.call(s); };
            };
        }
    };

Parallel.prototype = {
    update: function ()
    {
        this.__onupdate();
    },
    play:function()
    {
        Core.prototype.play.call(this);
        this.i = 0;
        for(var i=0,l=this.len; i<l; i++){
            this.list[i].play(true);
        }
        return this;
    },
    pause:function()
    {
        if(!Core.prototype.pause.call(this)){ return; }
        for(var i=0,l=this.len; i<l; i++){
            this.list[i].pause();
        }
    },
    resume:function()
    {
        if(!Core.prototype.resume.call(this)){ return; }
        for(var i=0,l=this.len; i<l; i++){
            this.list[i].resume();
        }
    },
    end:function()
    {
        this.status = -1;

        for(var i=0,l=this.len; i<l; i++){
            item = this.list[i];
            if(item.status!==3){ item.end(); }
        }
        Core.prototype.end.call(this);
    }
};
module.exports = inherit(Parallel, Core);
