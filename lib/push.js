'use strict';

var state,
    init = function () {
        if ($ && window.history && window.history.pushState) {
            state = require('./core/State')(window.location.pathname);

            window.addEventListener('popstate', function () {
                /** not yet **/
                var s = window.history.state || '';
                state.change(s);
            });
            return true;
        } else {
            return false;
        }
    },
    isAvailable = init();

module.exports = {
    change: function (v) {
        if (isAvailable) {
            window.history.pushState(v, null, v);
            state.change(v.split('#')[0]);
        } else {
            window.localStorage.href = v;
        }
    },
    listen: function (key, func) {
        return state.listen(key, func);
    },
    clear: function (key, func) {
        return state.clear(key, func);
    },

    wait: function () { state.wait(); },
    notify: function () { state.notify(); }
};