'use strict';

var 
    search = function (elm, name) {
        if (!elm.parentNode) {
            return false;
        } else {
            
            if (elm.className.indexOf(name)>-1) {
                return true;
            } else {
                return search(elm.parentNode, name);
            }
        }
    };

module.exports = function (elm, name) {
    return search(elm.parentNode, name);
};
