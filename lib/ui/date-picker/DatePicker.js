'use strict';

var
    $ = require('../../$'),
    looptime = require('../../utils/looptime'),
    isEmpty = require('../../utils/isEmpty'),
    dateFormat = require('../../utils/dateFormat'),
    noop = require('../../utils/noop'),

    index = 0,
    weeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    getMultiData = function (y, m) {
        var
            offset = 0,
            start = ((new Date(y, m, 1)).getDay() || 7) - offset,
            end = (new Date(y, m+1, 0)).getDate() + 6 + offset - (new Date(y, m+1, 1)).getDay(),
            arr = [],
            i = 0, l=start+end, j=0, k=0;

        for (i; i<=l; i++){
            j = Math.floor(i/7);
            k = i%7;

            if (k === 0) {
                arr[j] = [];
            }
            arr[j][k] = new Date(y, m, i + 1 - start);
        }
        return arr;
    },
    body = (function () {
        var root='<div class="mDatePicker">', i,j;
        root +=
            '<table class="mDatePicker_table">' +
            '<tr>' +
            '<td class="mDatePicker_prev">&lt;</td>' +
            '<td class="mDatePicker_title" colspan="5"></td>' +
            '<td class="mDatePicker_next">&gt;</td>' +
            '</tr>';

        root += '<tr class="mDatePicker_weeks">';
        for(i=0; i<7; i++) {
            root += '<td class="mDatePicker_week dp-week-'+i+'">' + weeks[i] + '</td>';
        }
        root += '</tr>';

        for(i=0; i<6; i++) {
            root += '<tr class="mDatePicker_dates dp-'+i+'">';
            for(j=0; j<7; j++) {
                root += '<td class="mDatePicker_date dp-'+j+'" dp-index="'+i+','+j+'"></td>';
            }
            root += '</tr>';
        }
        root += '</table></div>';
        return root;
    })(),
    DatePicker = function (id) {
        this.$ = $(id).css({visibility: 'hidden', 'z-index': 99999});
        this._today = new Date();
        this._current = new Date();
        this._select = noop;
        this._title = 'yyyy-mm';
        this._map = null;

        this.$.on('click', this._click.bind(this));
        this.$.html(body);

        this.$.find('.mDatePicker_prev').on('click', this.prev.bind(this));
        this.$.find('.mDatePicker_next').on('click', this.next.bind(this));

        this.$title = this.$.find('.mDatePicker_title');
        setTimeout(function () {
            this.update(this._current);
            this.$.css({visibility: 'visible'});
        }.bind(this), looptime);
    };

DatePicker.prototype = {
    today: function (val) {
        if (isEmpty(val)) {
            return this._today;
        } else {
            this._today = val;
            return this;
        }
    },
    current: function (val) {
        if (isEmpty(val)) {
            return this._current;
        } else {
            this._current = val;
            return this;
        }
    },
    select: function (fn) {
        this._select = fn || noop;
        return this;
    },
    update: function (d) {
        var today = new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate()),
            arr = getMultiData(d.getFullYear(), d.getMonth()),
            i,j,week,days,da;

        this.$.find('tr.mDatePicker_dates').hide();

        for(i=0; i<arr.length; i++) {
            days = arr[i];
            week = this.$.find('tr.dp-'+i);
            week.show();
            for(j=0; j<days.length; j++) {
                da = week.find('td.dp-'+j);
                da.text(days[j].getDate());
                days[j].getMonth() !== d.getMonth() ? da.addClass('dp-otherMonth') : da.removeClass('dp-otherMonth');
                days[j].getTime() === this._current.getTime() ? da.addClass('dp-current') : da.removeClass('dp-current');
                days[j].getTime() === today.getTime() ? da.addClass('dp-today') : da.removeClass('dp-today');
            }
        }
        this._current = d;
        this._map = arr;
        this.$title.text(dateFormat(d, this._title));
    },
    prev: function () {
        this.update(new Date(this._current.getFullYear(), this._current.getMonth()-1));
    },
    next: function () {
        this.update(new Date(this._current.getFullYear(), this._current.getMonth()+1));
    },
    _click: function (e) {
        var index = e.target.getAttribute('dp-index');
        if (!index) return;

        index = index.split(',');
        this._select(this._map[index[0]][index[1]]);
    }
};

module.exports = DatePicker;
