var Cp = require('../core/Cp'),
    Container = function ()
    {
        this.childs = [];
        this.__childUpdater = Cp();
        this.__canvasUpdater = Cp();
    };

Container.prototype = {
    append: function ()
    {
        var i=0, l=arguments.length;
        for (i; i<l; i++) {
            this.__append(arguments[i]);
        }
        return this;
    },
    __append: function (child)
    {
        if (child.depth) {
            child.parent.remove(child);
        }
        if (!child.__childUpdate) {
            child.__childUpdate = function (ctx)
            {
                if (!child.hidden) {
                    child.__draw(ctx);
                }
            };
            child.__canvasUpdate = function (canvas)
            {
                if (canvas) {
                    child.canvas = canvas;
                    child.__addToCanvas(canvas);
                } else {
                    child.__removeFromCanvas(canvas);
                    delete child.canvas;
                }
                if (child.__canvasUpdater) {
                    child.__canvasUpdater.update([canvas]);
                }
            };
        }

        child.parent = this;
        child.depth = this.childs.length;
        this.childs.push(child);
        this.__childUpdater.add(child.__childUpdate);
        this.__canvasUpdater.add(child.__canvasUpdate);

        if (this.canvas) {
            child.__canvasUpdate(this.canvas);
            this.canvas.update();
        }
        return this;
    },
    remove: function(child)
    {
        if (!child.parent) { return; }
        child.__canvasUpdate();

        this.__childUpdater.dispose(child.__childUpdate);
        this.__canvasUpdater.dispose(child.__canvasUpdate);
        this.childs.splice(child.depth, 1);
        if (child.depth !== this.childs.length-1) {
            this.__setOrder();
        }

        delete child.parent;
        delete child.depth;

        if (this.canvas) {
            this.canvas.update();
        }
        return this;
    },
    __setOrder: function()
    {
        var l=this.childs.length, i, it;
        for (i=l; i--;) {
            it = this.childs[i];
            it.depth = i;
        }
    },
    __draw: function(c)
    {
        this.__childUpdater.update([c]);
    }
};

module.exports = Container;