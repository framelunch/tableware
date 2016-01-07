var noop = require('utils/noop'),
    Rectangle = function (x, y, w, h)
    {
        this.x = x||0;
        this.y = y||0;
        this.w = w||0;
        this.h = h||0;
        this.__setUnion();
    };

Rectangle.prototype = {
    contains: function(x,y)
    {
        return x>this.x &&x <(this.w+this.x) && y>this.y && y<(this.h+this.y);
    },
    containsPoint: function(p)
    {
        return this.contains(p.x, p.y);
    },
    get: function(){
        return {x:this.x, y:this.y, w:this.w, h:this.h};
    },
    right: function()
    {
        return this.w+this.x;
    },
    bottom: function()
    {
        return this.h+this.y;
    },
    empty: function()
    {
        this.x = this.y = this.w = this.h = 0;
        this.union = this.__union1;
    },
    union: noop,

    __setUnion: function()
    {
        if(this.x | this.y | this.w | this.h){
            this.union=this.__union2;
        }else{
            this.union=this.__union1;
        }
    },
    __union1: function(rect)
    {
        this.x = rect.x;
        this.y = rect.y;
        this.w = rect.w;
        this.h = rect.h;
        this.union = this.__union2;
    },
    __union2: function(rect)
    {
        var a,b;
        if(this.x>rect.x){
            a = this.x-rect.x;
            b = a+this.w;
            this.w = (b>rect.w)?b:rect.w;
            this.x = rect.x;
        }else{
            a = rect.x-this.x;
            b = a+rect.w;
            if(b>this.w){ this.w=b; }
        }
        if(this.y>rect.y){
            a = this.y-rect.y;
            b = a+this.h;
            this.h = (b>rect.h)?b:rect.h;
            this.y = rect.y;
        }else{
            a = rect.y-this.y;
            b = a+rect.h;
            if(b>this.h){ this.h=b; }
        }
    }
};

module.exports = function (x, y, w, h) {
    return new Rectangle(x, y, w, h);
};