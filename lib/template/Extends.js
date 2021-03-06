'use strict';

var
    looptime = require('../utils/looptime'),
    noop = require('../utils/noop'),
    isEqual = require('../utils/isEqual'),
    datePicker = require('../ui/date-picker'),
    tagInput = require('../ui/tag-input')
    ;

exports.tagInput = function (temp, elm) {
    var input = tagInput(elm),
        key = elm.getAttribute('tw-model'),
        opt = elm.getAttribute('tw-options'),
        name = elm.getAttribute('tw-option-name') || 'name',
        create = elm.getAttribute('tw-create')
        ;

    create = temp.get(create, true) || noop;
    
    return function () {
        input
            .name(name)
            .create(create)
            .options(temp.get(opt))
            .data(temp.get(key))
            .change(function (data) {
                temp.set(key, data);
                setTimeout(temp.scope.__update, looptime);

                temp.call(elm.getAttribute('tw-change'), data);
                temp.notice.publish('change', [data]);
            });
    };
};

exports.datePicker = function (temp, elm) {
    var input = datePicker(elm),
        key = elm.getAttribute('tw-model');

    elm.setAttribute('type', 'text');

    return function () {
        input
            .current(temp.get(key))
            .select(function (date) {
                temp.set(key, date);
                setTimeout(temp.scope.__update, looptime);

                temp.call(elm.getAttribute('tw-change'), date);
                temp.notice.publish('change', [date]);
            });
    };
};

exports.select = function (temp, elm) {
    var opt = elm.getAttribute('tw-option'),
        name = elm.getAttribute('tw-option-name') || 'name',
        value = elm.getAttribute('tw-option-value') || 'value',
        evl = elm.getAttribute('tw-option-eval'),
        key = elm.getAttribute('tw-model');

    if (evl) {
        evl = temp.get(evl, true);
    } else {
        evl = function (_optItem, _model) {
            return isEqual(_optItem[value] || _optItem, _model);
        };
    }

    elm.addEventListener('change', function (e) {
        var v = temp.get(opt)[e.target.selectedIndex];
        temp.set(key, v[value] || v);
        setTimeout(temp.scope.__update, looptime);
        
        e.__target = e.target;
        e.__scope = temp.scope;
        
        temp.call(elm.getAttribute('tw-change'), e);
        temp.notice.publish('change', [e]);
    });
    
    return function () {
        var options = temp.get(opt), i=0, l=options.length, body='', index=-1, item;
        for(i; i<l; i++) {
            item = options[i];
            body += '<option>' + (item[name] || item) + '</option>';
            if (evl(options[i], temp.get(key))) index = i;
        }
        elm.innerHTML = body;
        elm.selectedIndex = index;
    };
};