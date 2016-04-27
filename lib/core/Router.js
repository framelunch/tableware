'use strict';

var
    Router = function (options) {
        this.current = null;
        this.routes = [];
        this.mode = options && options.mode && options.mode === 'history' && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root && options.root!=='/' ? '/' + this.clearSlashes(options.root) + '/' : '/';

        var self = this;
        window.addEventListener('popstate', function () {
            var c = self.getCurrentPath();
            if(self.current !== c) {
                self.current = c;
                self.check(c);
            }
        });
    };

Router.prototype = {
    getCurrentPath: function () {
        return '/' + this.clearSlashes(decodeURI(location.pathname + location.search));
    },
    /**
     * new use this method
    getFragment: function () {
        var fragment = '';
        if(this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    */
    clearSlashes: function (path) {
        return path.toString().replace(/\/$/, '').replace(/\/\?+/, '?').replace(/^\//, '');
    },
    add: function (re, handler) {
        if(typeof re === 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({re: re, handler: handler});
        return this;
    },
    remove: function (param) {
        for(var i=0, r; i<this.routes.length, r=this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    flush: function () {
        this.current = null;
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    },
    check: function (f) {
        //var fragment = f || this.getFragment();
        var fragment = f.replace(/\?(.*)$/, '');
        for(var i=0; i<this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
    },
    navigate: function (path) {
        path = this.clearSlashes(path ? path : '');
        if (path === this.current) return;

        if (this.mode === 'history') {
            if (this.current===null) {
                history.replaceState(null, null, this.root + path);
            } else {
                history.pushState(null, null, this.root + path);
            }
            this.check(path);
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        this.current = path;
        return this;
    }
};

module.exports = function (opt) {
    return new Router(opt);
};