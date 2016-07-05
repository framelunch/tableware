'use strict';

var
    search = function (elm, name, rootNode) {
        var v = elm.getAttribute(name);
        if (v) {
            return v;
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
