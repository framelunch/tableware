var main = function (to, from) {
    var name, value;
    for(name in from) {
        value = from[name];
        if (typeof to[name] === 'object') {
            main(to[name], value);
        } else {
            to[name] = value;
        }
    }
    return to;
};

module.exports = main;