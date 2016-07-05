'use strict';

var
    $ = require('../$'),
    isEmpty = require('utils/isEmpty'),
    SelectBox = function (id) {
        if (typeof id === 'string') {
            this.$ = $(id);
        } else {
            this.$ = id;
        }
        this._displayValue = 'name';
    };

SelectBox.prototype = {
    data: function (data) {
        var body = "",
            i = 0,
            l = data.length,
            item;

        for(i; i<l; i++){
            item = data[i];
            body += "<option>"+(typeof item === 'object' ? item[this._displayValue] : item)+"</option>";
        }
        this.$.html(body);
        this._data = data;
        return this;
    },
    displayName: function (str) {
        if (isEmpty(str)) {
            return this._displayName;
        } else {
            this._displayName = str;
            return this;
        }
    },
    selectedData: function () {
        return this._data[this.index()];
    },
    index: function (index) {
        if (isEmpty(index)) {
            return this.$[0].selectedIndex;
        } else {
            this.$[0].selectedIndex = index;
            return this;
        }
    },
    val: function (v) {
        return this.$(v);
    },
    change: function (cb) {
        var self = this;
        this.$.on('change', function () {
            cb(self.selectedData());
        });
        return this;
    }
};

module.exports = function (id, data) {
    return (new SelectBox(id)).data(data);
};