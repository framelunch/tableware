'use strict';

var
    notice = require('./core/Notice')(),
    state = require('./core/State')(),
    router = require('./core/Router')({mode:'history', root:'/'});
    
module.exports = {
    start: function () {
        router.navigate(router.getCurrentPath());
    },
    add: function (pt, st) {
        if (typeof st === 'function') {
            router.add(pt, st);
        } else {
            var arr = st.split('/'), l=arr.length;
            router.add(pt, function () {
                var i=0, a=[], item;
                for(i; i<l; i++){
                    item = arr[i];
                    if (item.charAt(0) !== ':') {
                        a.push(item);
                    }
                }
                notice.publish('router:start');
                notice.publish(st, arguments);
                state.change(a.join('/'), arguments);
            });    
        }
        return this;
    },
    remove: function (pt) {
        router.remove(pt);
        return this;
    },
    navigate: function (v) {
        router.navigate(v);
        return this;
    },
    listen: function (key, func) {
        if (/^(state:|add:|remove:)/.test(key)) {
            state.listen(key, func);
        } else {
            notice.listen(key, func);
        }

    },
    clear: function (key, func) {
        if (/^(state:|add:|remove:)/.test(key)) {
            state.clear(key, func);
        } else {
            notice.clear(key, func);
        }

    },

    wait: function () { state.wait(); },
    notify: function () { state.notify(); }
};