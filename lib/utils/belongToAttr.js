'use strict';

var
    search = function (elm, name, rootNode) {
        if (elm.hasAttribute(name)) {
            return elm;
        } else {
            if (elm.isEqualNode(rootNode) || !elm.parentNode) {
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
