'use strict';

var
    index = 0,
    $ = require('../../$'),
    isEmpty = require('../../utils/isEmpty'),
    noop = require('../../utils/noop'),
    dateFormat = require('../../utils/dateFormat'),
    Core = require('./Core'),
    Input = function (id) {
        this.$ = $(id);
        this.$.on('click', this._click.bind(this));
        this.container = null;
        
        this._current = null;
        this._format = this.$.attr('dp-format') || 'yyyy/mm/dd';
        this._select = noop;
    };

Input.prototype = {
    current: function (val) {
        if (isEmpty(val)) {
            return this._current;
        } else {
            this._current = val;
            this.$.val(dateFormat(this._current, this._format));
            return this;
        }
    },
    format: function (str) {
        if (isEmpty(str)) {
            return this._format;
        } else {
            this._format = str;
            return this;
        }
    },
    select: function (fn) {
        this._select = fn || noop;
        return this;  
    },
    _click: function () {
        if (this.container) return;

        var id = 'date-picker-container-' + (index++);
        this.container = $(
            '<div style="position: relative">' +
            '<div id="'+id+'" style="' +
            'position:absolute;' +
            'top:'+this.$.offsetTop() + this.$.offsetHeight()+';' +
            'left:'+this.$.offsetLeft()+';"></div></div>'
        );
        this.$.insertAfter(this.container);

        (new Core('#'+id))
            .current(this._current || new Date())
            .select(function (date) {
                this.current(date);
                this.container.remove();
                this.container = null;
                this._select(date);
            }.bind(this));
    }
};

module.exports = Input;