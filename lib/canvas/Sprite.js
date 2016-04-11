'use strict';

var inherit = require('../utils/inherit'),
    View = require('./View'),
    Container = require('./Container'),

    Sprite = function () {
        View.call(this);
        Container.call(this);
    };

Sprite.prototype = {
    __draw:function(c){
        View.prototype.__draw.call(this, c);
        Container.prototype.__draw.call(this, c);
    }
};
inherit(Sprite, View);
inherit(Sprite, Container);

module.exports = Sprite;