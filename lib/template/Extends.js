'use strict';

var
    looptime = require('../utils/looptime'),
    isEqual = require('../utils/isEqual'),
    datePicker = require('../ui/date-picker')
    ;

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
        evl = function (opt, model) { return isEqual(opt[value] || opt, model); };
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