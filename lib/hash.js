'use strict';

var state = require('./core/State')(),
    hashchange = function () {
        var s = location.hash.replace('#','');
        state.change(s);
    },
    init = function () {
        window.addEventListener('hashchange', hashchange);
        hashchange();
    };

module.exports = {
  change: function (v) {
      location.hash = v;
  },
  listen: function (key, func) {
    return state.listen(key, func);
  },
  clear: function (key, func) {
    state.clear(key, func);
  },

  wait: function () { state.wait(); },
  notify: function () { state.notify(); }
};
init();