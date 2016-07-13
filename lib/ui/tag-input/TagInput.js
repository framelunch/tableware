'use strict';

var
    $ = require('../../$'),
    each = require('../../utils/each'),
    noop = require('../../utils/noop'),
    belongToClass = require('../../utils/belongToClass'),

    body = (function () {
        var root =
            '<div class="mTagInput">' +
            '<div class="mTagInput_container">' +
            '<input type="text" class="mTagInput_input loading-before">' +
            '</div>' +
            '<div class="mTagInput_optContainer"><div class="mTagInput_options"></div></div>' +
            '</div>';
        return root;
    })(),
    getTag = function (text) {
        var root = '<div class="mTagInput_item"><span>'+text+'</span>&nbsp;<i class="fa fa-close"></i></div>';
        return root;
    },
    getOption = function (text) {
        var root = '<div class="mTagInput_option"><span>'+text+'</span></div>';
        return root;
    },
    timeId,

    TagInput = function (id) {
        this.$body = $(body);
        this.$input = this.$body.find('.mTagInput_input');
        this.$options = this.$body.find('.mTagInput_options').hide();
        $(id).hide().insertAfter(this.$body);

        this._selectedIndex = -1;
        this._selectedOptions;

        this._name = 'name';
        this._change = noop;
        this._create = noop;
        this._data = [];
        this._options = [];

        this.$input.on('input', this.onChange.bind(this));
        this.$input.on('keydown', this.onKeyPress.bind(this));
        this.$input.on('focus', this.onChange.bind(this));
        this.$input.on('blur', this.onFocusOut.bind(this));

        this.$body.on('click', this.onClick.bind(this));
        this.$options.on('mousedown', this.onClickOption.bind(this));
        this.$options.on('mousemove', this.onHover.bind(this));
    };

TagInput.prototype = {
    onChange: function () {
        this.onFocusOut();

        var self = this,
            val = this.$input.val().toLowerCase(),
            flg, name;

        if (val.length===0) return;
        flg = $(document.createDocumentFragment());

        each(this._options, function (item) {
            name = item[self._name];
            if (new RegExp(val).test(name.toLowerCase())) {
                self._selectedOptions.push(item);
                flg.append($(getOption(name)));
            }
        });

        if (flg[0].childNodes.length) {
            this.$options.append(flg);
            this.$options.show();
            this.selectedIndex(0);
        }
        return this;
    },
    onHover: function (e) {
        var $item = $(belongToClass(e.target, 'mTagInput_option'));
        this.selectedIndex($item.index());
    },
    onClickOption: function (e) {
        var index = $(belongToClass(e.target, 'mTagInput_option')).index();
        this.add(this._options[index]);
    },
    selectedIndex: function (index) {
        if (0>index || this.$options[0].childNodes.length<=index) return;
        if (this.$options.hidden() || this._selectedIndex === index) return;

        var $item = this.$options.find('.mTagInput_option').removeClass('hover');
        $($item[index]).addClass('hover');
        this._selectedIndex = index;
    },

    onFocusOut: function () {
        $('.mTagInput_option').remove();
        this.$options.hide();
        this._selectedIndex = -1;
        this._selectedOptions = [];
    },
    _build: function () {
        $('.mTagInput_item').remove();

        var self = this,
            flg = $(document.createDocumentFragment());
        each(this._data, function (item) {
            flg.append($(getTag(item[self._name])));
        });
        this.$input.insertBefore(flg);
        this.$input.val('');
        this.onFocusOut();
        return this;
    },

    name: function (n) {
        this._name = n;
        return this;
    },
    change: function (fn) {
        this._change = fn;
        return this;
    },
    create: function (fn) {
        this._create = fn;
        return this;
    },
    options: function (d) {
        this._options = d;
        return this;
    },
    data: function (d) {
        this._data = d;
        this._build();
        return this;
    },

    add: function (d) {
        if (typeof d === 'string') {
            this._create(d);
        } else {
            this._data.push(d);
            this._build();
            this._change(this._data);
        }
        return this;
    },
    remove: function (index) {
        if (typeof index !== 'number') index = -1;
        this._data.splice(index, 1);
        this._build();
        this._change(this._data);
        return this;
    },
    onKeyPress: function (e) {
        switch (e.keyCode) {
            case 38:
                this.selectedIndex(this._selectedIndex-1);
                break;
            case 40:
                this.selectedIndex(this._selectedIndex+1);
                break;
            case 8:
                if (this.$input.val().length > 0) return;
                this.remove();
                break;
            case 13:
                if (this.$input.val().length === 0) return;

                if (timeId) clearTimeout(timeId);
                timeId = setTimeout(function () {
                    this._selectedIndex>-1 ?
                        this.add(this._selectedOptions[this._selectedIndex]) :
                        this.add(this.$input.val());
                }.bind(this), 100);
                break;
        }
    },
    onClick: function (e) {
        var item = $(e.target);
        if (item.hasClass('fa-close')) {
            this.remove(item.parent().index());
        }
    }
};

module.exports = TagInput;
