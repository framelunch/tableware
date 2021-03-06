'use strict';

var 
    search = function (elm, name, rootNode) {
        if (typeof elm.className.indexOf==='function' && elm.className.indexOf(name)>-1) {
            return elm;
        } else {
            if (elm.isEqualNode(rootNode)) {
                return null;
            } else {
                return search(elm.parentNode, name, rootNode);
            }
        }
    };

module.exports = function (elm, name, rootNode) {
    rootNode = rootNode || document.body;
    return search(elm, name, rootNode);
};
