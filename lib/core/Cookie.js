var
    noop = require('../utils/noop'),
    extend = function () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    },
    Cookie = function (converter) {
        this.converter = converter || noop;
        this.defaults = {};
    };

Cookie.prototype = {
    set: function (key, value, attributes) {
        var result;

        attributes = extend({path: '/'}, this.defaults, attributes);

        if (typeof attributes.expires === 'number') {
            var expires = new Date();
            expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
            attributes.expires = expires;
        }

        try {
            result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
                value = result;
            }
        } catch (e) {}

        if (!this.converter.write) {
            value = encodeURIComponent(String(value))
                .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
            value = this.converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        return (document.cookie = [
            key, '=', value,
            attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
            attributes.path    && '; path=' + attributes.path,
            attributes.domain  && '; domain=' + attributes.domain,
            attributes.secure ? '; secure' : ''
        ].join(''));
    },

    get: function (key, json) {
        var result = null;
        if (!key) result = {};

        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var rdecode = /(%[0-9A-Z]{2})+/g;
        var i = 0;

        for (; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var name = parts[0].replace(rdecode, decodeURIComponent);
            var cookie = parts.slice(1).join('=');

            if (cookie.charAt(0) === '"') {
                cookie = cookie.slice(1, -1);
            }

            try {
                cookie = this.converter.read ?
                    this.converter.read(cookie, name) : this.converter(cookie, name) ||
                cookie.replace(rdecode, decodeURIComponent);

                if (json) {
                    try {
                        cookie = JSON.parse(cookie);
                    } catch (e) {}
                }

                if (key === name) {
                    result = cookie;
                    break;
                }

                if (!key) {
                    result[name] = cookie;
                }
            } catch (e) {}
        }
        return result;
    },
    getJSON: function (key) {
        return this.get(key, true);
    },
    remove: function (key, attributes) {
        this.set(key, '', extend(attributes, {expires: -1}));
    }
};

module.exports = function (converter) {
    return new Cookie(converter);
};