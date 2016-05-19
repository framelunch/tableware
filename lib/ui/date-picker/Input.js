'use strict';

var
    $ = require('../../$'),
    isEmpty = require('../../utils/isEmpty'),
    noop = require('../../utils/noop'),
    dateFormat = require('../../utils/dateFormat'),
    belongToClass= require('../../utils/belongToClass'),

    index = 0,
    Core = require('./Core'),
    $body = $('body'),

    Input = function (id) {
        this.$ = $(id);
        this.$.on('click', this._click.bind(this));
        this.container = null;
        
        this._current = null;
        this._format = this.$.attr('dp-format') || 'yyyy/mm/dd';
        this._select = noop;


        var self = this;
        this._bodyClick = function (e) {
            if (!belongToClass(e.target, 'mDatePicker')) {
                self.close();
            }
        };
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
    close: function () {
        this.container.remove();
        this.container = null;
        $body.off('click', this._bodyClick);
    },
    _click: function () {
        if (this.container) return;

        var id = 'date-picker-container-' + (index++);
        this.container = $(
            '<div style="position: relative">' +
            '<div id="'+id+'" style="position:absolute;" class="mDatePicker_container">' +
            '</div></div>'
        );
        this.$.insertAfter(this.container);

        (new Core('#'+id))
            .current(this._current || new Date())
            .select(function (date) {
                this.current(date);
                this.close();
                this._select(date);
            }.bind(this));

        setTimeout(function () {
            $body.on('click', this._bodyClick);
        }.bind(this), 100);
    }
};

module.exports = Input;