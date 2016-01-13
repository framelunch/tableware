var main = function (to, from) {
    var name, value, target;
    for(name in from) {
        value = from[name];
        target = to[name];
        if (typeof target === 'object') {
            main(to[name], value);
        }
        else if(typeof target === 'function' && typeof value !== 'function') {
            to[name](value);
        }
        else {
            to[name] = value;
        }
    }
    return to;
};

module.exports = main;