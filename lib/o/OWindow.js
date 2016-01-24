var
    inherit = require('../utils/inherit'),
    set = require('../utils/set'),

    Window = require('../anim/wrap/Window'),

    OWindow = function (e) {
        Window.call(this, e);
    };

OWindow.prototype = {
    set: function (val) {
        set(this, val);
        console.log(this);
        this.update();
        return this;
    }
};
module.exports = inherit(OWindow, Window);
