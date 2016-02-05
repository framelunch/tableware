var
    o = require('../o'),
    anim = require('../anim'),

    Accordion = function (opt) {
        this.openBt = o(opt.open);
        this.closeBt = o(opt.close);
        this.container = o(opt.container);
        this.content = o(opt.content);

        this.closeBt.hidden(true);
        this.container.hidden(true);
        this.container.css({height:0, opacity:0, overflow: 'hidden'});

        var self = this;
        this.openBt.on('click', function () {
            self.onOpen();
        });
        this.closeBt.on('click', function () {
            self.onClose();
        });
    };

Accordion.prototype = {
    onOpen: function () {
        anim.pause(this.tw);
        this.openBt.hidden(true);
        this.closeBt.hidden(false);
        this.container.hidden(false);
        this.tw = anim(this.container, {height: this.content.height(), opacity:1}, 300, anim.QuadOut);
    },
    onClose: function () {
        anim.pause(this.tw);
        this.openBt.hidden(false);
        this.closeBt.hidden(true);
        this.tw = anim(this.container, {height: 0, opacity:0}, 300, anim.QuadOut);
    },
    open: function () {
        this.onOpen();
    },
    close: function () {
        this.onClose();
    }
};

module.exports = function (opt) {
    return new Accordion(opt);
};