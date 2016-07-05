'use strict';

var
    $ = require('../../$'),
    isEmpty = require('../../utils/isEmpty'),
    noop = require('../../utils/noop'),
    dateFormat = require('../../utils/dateFormat'),
    belongToClass= require('../../utils/belongToClass'),
    globalVector = require('../../utils/globalVector'),

    index = 0,
    DatePicker = require('./DatePicker'),
    $w = $(window),
    $body = $('body'),

    DatePickerWithInput = function (id) {
        this.$ = $(id);
        this.$.on('click', this._click.bind(this));
        this.$.on('input', this._input.bind(this));
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

DatePickerWithInput.prototype = {
    current: function (val) {
        if (arguments.length>0) {
            if (typeof val === 'object') {
                this._current = val;
                this.$.val(dateFormat(this._current, this._format));
            } else {
                this._current = null;
                this.$.val('');
            }
            return this;
        } else {
            return this._current;
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

        (new DatePicker('#'+id))
            .current(this._current || new Date())
            .select(function (date) {
                this.current(date);
                this.close();
                this._select(date);
            }.bind(this));

        setTimeout(function () {
            $body.on('click', this._bodyClick);
        }.bind(this), 100);

        var w = this.container[0].childNodes[0].offsetWidth;
        if ($w.width() - globalVector(this.$[0]).x-$w.scrollLeft() < w) {
            this.container.css({left: this.$.offsetWidth() - w});
        }
    },
    _input: function () {
        if (!this.$.val()) this._select();
    }
};

module.exports = DatePickerWithInput;