var userAgent = window.navigator.userAgent.toLowerCase();

module.exports = function () {
    var i = 0, l = arguments.length;
    for(i; i<l; i++) {
        if (userAgent.indexOf(arguments[i]) > -1) {
            return true;
        }
    }
    return false;
};
