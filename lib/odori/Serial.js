var inherit = require('utils/inherit'),
    Core = require('./Core'),
    Serial = function (args) {
        Core.call(this);

        this.list = args;
        this.len = args.length;
        this.i = 0;

        for(var i=this.len,s=this; i--;){
            this.list[i].pause();
            this.list[i].__onend = function(){
                if(s.status===-1){ return; }
                if(++s.i===s.len){ Core.prototype.end.call(s); }else{ s._cplay(); }
            };
        }
    };

Serial.prototype = {
    update: function () {
        this.__onupdate();
    },
    play:function(){
        Core.prototype.play.call(this);
        this.i = 0;
        this._cplay();
        return this;
    },
    _cplay:function(){
        this.list[this.i].play(true);
    },
    pause:function(){
        if(!Core.prototype.pause.call(this)){ return; }
        this.list[this.i].pause();
    },
    resume:function(){
        if(!Core.prototype.resume.call(this)){ return; }
        this.list[this.i].resume();
    },
    end:function(){
        this.status = -1;

        for(var i=0,l=this.len,item; i<l; i++){
            item = this.list[i];
            item.end();
        }
        Core.prototype.end.call(this);
    }
};
module.exports = inherit(Serial, Core);
