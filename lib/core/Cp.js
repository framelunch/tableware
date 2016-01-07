'use strict';

var
    dummy = {update:function(){}},
    count = 0,
    Node,
    Cp;

Node = function(fc, prev, next){
    this.func = fc;
    this.prev = prev;
    this.next = next;
    this.available = false;
};
Node.prototype = {
    update: function(args){
        this.func.apply(null, args||[]);
        this.next.update(args);
    },
    reverse: function(args){
        this.func.apply(null, args||[]);
        this.prev.update(args);
    },
    release: function(){
        delete this.func;
        delete this.next;
        delete this.prev;
    }
};
Cp = function () {
    count += 1;
    this.id = count;
    this.index = 1;
    this.length = 0;
    this.first = new Node(function(){}, dummy, dummy);
    this.current = this.first;
    this.list = {};
};
Cp.prototype = {
    update: function (args) {
        this.first.update(args);
    },
    reverse: function (args) {
        this.current.reverse(args);
    },
    add: function(fc){
        var n, id;

        id = fc['__coupling__' + this.id];
        if (id) {
            n = this.list[id];
            if (n.available) {
                return;
            } else {
                n.prev = this.current;
                n.next = dummy; }
        } else {
            id = fc['__coupling__' + this.id] = this.index++;
            n = this.list[id] = new Node(fc, this.current, dummy);
        }

        n.available = true;
        this.current.next = n;
        this.current = n;

        this.length += 1;
        return fc;
    },
    remove: function(fc){
        var id, n;

        id = fc['__coupling__' + this.id];
        if (!id) {
            return null;
        }

        n = this.list[id];
        if (!n.available) { return; }

        n.prev.next = n.next;
        n.next.prev = n.prev;

        if (this.current===n) { this.current = n.prev; }
        n.available = false;

        this.length -= 1;
        return id;
    },
    dispose: function(fc){
        var id = this.remove(fc);
        delete this.list[id];
        delete fc['__coupling__' + this.id];
    },
    release: function(){
        var
            n, p,
            list = this.list;

        for (p in list) {
            n = list[p];
            delete n.fc['__coupling__' + this.id];
            n.release();
        }
        delete this.id;
        delete this.index;
        delete this.length;
        delete this.first;
        delete this.current;
        delete this.list;
    }
};

module.exports = function () {
    return new Cp();
};