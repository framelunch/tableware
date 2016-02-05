'use strict';

var
    Cp = require('./Cp'),
    loop = require('../utils/loop'),
    Data,
    State;

Data = function (value)
{
    this.data = this.make(value);
    this.str = '/'+this.data;
    this.array = (this.data === '') ? [''] : this.data.split('/');
};
Data.prototype = {
    make: function (value)
    {
        if(value.charAt(0)==='/'){
            value = value.substr(1);
        }
        if(value.charAt(value.length-1)==='/'){
            value = value.substr(0, value.length-1);
        }
        return value;
    },
    compare: function (value)
    {
        var arr = [],
            l = this.array.length,
            i, a, b;

        for(i = 0; i < l; i++){
            a = this.array.slice(0, i).join('/');
            b = value.array.slice(0, i).join('/');
            if(a + this.array[i] === b + value.array[i]){ continue; }

            arr.push(this.array[i]);
        }
        return arr;
    },
    eq: function (value)
    {
        return this.data === this.make(value);
    }
};

State = function (def)
{
    this.pool = [];
    this.active = false;
    this.w = 0;
    this.current = new Data(def || '');
    this.cps = {start: Cp(), update: Cp(), end: Cp()};

    var _this = this;
    this.loop = function(){ _this._loop(); };

    this.historys = [];
    this.ite = 0;
};
State.prototype = {
    change: function (v)
    {
        if (this._change(v)) {
            if (this.historys.length === 0) {
                this.historys.push(this.current.data);
            }
            else {
                this.historys.splice(this.ite + 1);
                this.historys.push(this.current.data);
                this.ite++;
            }
            return true;
        } else {
            return false;
        }
    },
    _change: (function(){
        var _set = function(prefix, items, pool, cps){
            for(var i=0, l=items.length, name; i < l; i++){
                name = items[i];
                pool.push({prefix:prefix, name:name});

                if (!cps[name = prefix + name]) {
                    cps[name] = Cp();
                }
            }
        };

        return function(v)
        {
            if(this.current.eq(v)){ return false; }

            var data = new Data(v);
            _set('remove:', this.current.compare(data).reverse(), this.pool, this.cps);
            _set('add:', data.compare(this.current), this.pool, this.cps);

            this.current = data;

            if(!this.active){
                this.active = true;
                this.cps['start'].update();
                loop.add(this.loop);
            }

            this.cps['update'].update([this.current]);
            return true;
        };
    })(),
    _loop: function()
    {
        if(this.w){ return; }

        if(this.pool.length===0){
            this.active = false;
            this.cps['end'].update();
            loop.remove(this.loop);
            return;
        }

        var o = this.pool[0];
        this.cps[o.prefix + o.name].update();
        this.pool.shift();
    },

    prev: function ()
    {
        if (this.ite < 1) {
            return;
        }
        this._change(this.historys[--this.ite]);
    },
    next: function ()
    {
        var l = this.historys.length;
        if (l === 0 || this.ite === l - 1) {
            return;
        }
        this._change(this.historys[++this.ite]);
    },

    wait: function()
    {
        ++this.w;
    },
    notify: function()
    {
        --this.w;
    },

    listen: function (key, func)
    {
        var c = this.cps[key];
        if (!c) {
            c = this.cps[key] = Cp();
        }
        c.add(func);
        return func;
    },
    clear: function (key, func)
    {
        var c = this.cps[key];
        if (!c) { return; }
        c.remove(func);
    }
};

module.exports = function (def) {
    return new State(def);
};