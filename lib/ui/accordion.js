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
        
        this.openBt.on('click', this.onOpen.bind(this));
        this.closeBt.on('click', this.onClose.bind(this));
    };

Accordion.prototype = {
    onOpen: function () {
        anim.pause(this.tw);
        this.openBt.hidden(true);
        this.closeBt.hidden(false);
        this.container.hidden(false);
        this.tw = anim(this.container, {height: this.content.offsetHeight(), opacity:1}, 300, anim.QuadOut);
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