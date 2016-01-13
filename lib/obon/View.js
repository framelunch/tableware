var inherit = require('../utils/inherit'),
    Core = require('./Core'),
    View = function () {
        Core.call(this);
        this.alpha = 1;
        this.__alpha = 1;
        this.shadowColor = 'rgba(0,0,0,0)';
        this.shadowBlur = 0;
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
    };

View.prototype = {
    __draw:function(c){
        Core.prototype.__draw.call(this, c);
        c.globalAlpha = this.__alpha = this.parent.__alpha * this.alpha;
        c.beginPath();

        if(!this.shadowBlur && this.parent.shadowBlur){
            var p = this.parent;
            c.shadowColor = p.shadowBlur;
            c.shadowBlur = p.shadowBlur;
            c.shadowOffsetX = p.shadowOffsetX;
            c.shadowOffsetY = p.shadowOffsetY;
        }else{
            c.shadowColor = this.shadowBlur ? this.shadowColor : 'rgba(0,0,0,0)';
            c.shadowBlur = this.shadowBlur;
            c.shadowOffsetX = this.shadowOffsetX;
            c.shadowOffsetY = this.shadowOffsetY;
        }

        this.draw(c, this.bounds);
    },
    release:function(){
        delete this.__alpha;
        delete this.alpha;
        delete this.shadowColor;
        delete this.shadowBlur;
        delete this.shadowOffsetX;
        delete this.shadowOffsetY;
    }
};

module.exports = inherit(View, Core);