'use strict';

var main = function (o1, o2) {
    switch (typeof o1) {
        case 'object':
            var bool = true, p;
            for(p in o1) {
                bool = main(o1[p], o2[p]);
            }
            for(p in o2) {
                bool = main(o1[p], o2[p]);
            }
            return bool;
        default:
            return o1 === o2;
    }
};

module.exports = function (o1, o2) {
    return main(o1, o2);
};
