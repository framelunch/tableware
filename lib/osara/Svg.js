var
    utils = require('utils'),
    Svg = function (domId, w, h) {
        this.e = document.getElementById(domId) || document.createElement('svg');
        this.e.width = w || this.e.width || 300;
        this.e.height = h || this.e.height || 300;

        this.width = this.e.width;
        this.height = this.e.height;
    };

Svg.prototype = {
    attr: function (opt, value) {
        if (!opt) return;

        if (typeof opt === 'object') {
            utils.merge(this, opt);
        } else {
            this[opt] = value;
        }
        this.__update();
        return this;
    },

    __update: function () {
        var e = this.e;
    }
};

module.exports = Svg;
