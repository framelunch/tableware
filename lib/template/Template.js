'use strict';

var
    noop = require('utils/noop'),
    looptime = require('utils/looptime'),
    each = require('../utils/each'),
    belongToAttr = require('../utils/belongToAttr'),
    isEmpty = require('../utils/isEmpty'),
    isEqual = require('../utils/isEqual'),

    Notice = require('../core/Notice'),
    binds = require('./Binds'),
    exts = require('./Extends'),
    filters = require('./Filters'),

    regUpdate = /\${([^{}]+)}/g,
    regBindText = /\${[^{}]+}/,
    regBind = "\\${[^{}]+}|tw-model|tw-extend",

    Template = function (query, parent) {
        this.root = typeof query === 'string' ? document.querySelector(query) : query;
        this.notice = parent ? parent.notice : Notice();
        this.extends = [];
        this.scope = null;
    };

for(var p in binds) {
    regBind += '|' + p;
}
regBind = new RegExp(regBind);

Template.init = function () {
    this.root.style.visibility = 'hidden';
};
Template.update = function () {
    this.root.style.visibility = null;
};

Template.prototype = {
    listen: function (key, fc) {
        this.notice.listen(key, fc);
    },
    clear: function (key, fc) {
        this.notice.clear(key, fc);
    },
    
    init: function (obj) {
        if (!this.scope) {
            this.scope = obj || {};
            if (!this.scope.__update) {
                this.scope.__update = this.update.bind(this);
            }
            
            this.setEvent();
            this.setBinds();
        }
        Template.init.call(this);
        return this;
    },
    setEvent: function () {
        var self = this;
        this.root.addEventListener('click', function (e) {
            var tar = belongToAttr(e.target, 'tw-click', self.root);
            if (tar) {
                e.cancelBubble = true;
                e.__target = tar;
                e.__scope = self.scope;
                self.call(tar.getAttribute('tw-click'), e);
            }
        });

        this.root.addEventListener('input', function (e) {
            e.cancelBubble = true;

            var tar = e.target,
                key = tar.getAttribute('tw-model'),
                rest;

            if (tar.getAttribute('tw-extend')) return;
            if (key && /text|password|number|email/.test(tar.type)) {
                if ((rest = tar.getAttribute('tw-restrict'))) {
                    tar.value = tar.value.replace(new RegExp(rest), '');
                }

                self.set(key, tar.value);
                setTimeout(self.scope.__update, looptime);

                self.call(tar.getAttribute('tw-change'), e);
                self.notice.publish('change', [e]);
            }
        });

        this.root.addEventListener('change', function (e) {
            e.cancelBubble = true;

            var tar = e.target,
                key = tar.getAttribute('tw-model');

            if (tar.getAttribute('tw-extend')) return;
            if (key && (/checkbox|radio/.test(tar.type) || tar.tagName==='SELECT')) {
                switch(tar.type) {
                    case 'checkbox':
                        self.set(key, tar.checked);
                        break;
                    default :
                        self.set(key, tar.value);
                        break;
                }

                setTimeout(self.scope.__update, looptime);
                
                self.call(tar.getAttribute('tw-change'), e);
                self.notice.publish('change', [e]);
            }
        });
    },
    setBinds: function () {
        this.models = [];
        this.extends = [];

        this.texts = [];
        this.attrs = [];
        this.fors = [];
        this.forElements = [];
        this.binds = [];
        this._node([this.root]);
    },
    _node: function (nodes) {
        var
            reg = regBind,
            regText=regBindText,
            self=this, key;

        Array.prototype.map.call(nodes, function (item) {
            if (item.getAttribute) {
                if ((key=item.getAttribute('tw-for'))) {
                    key = key.split(' in ');
                    self.fors.push((function (obj, item, key) {
                        obj.node = item;
                        obj.name = key[1] ? key[0] : null;
                        obj.key = key[1] || key[0];

                        if (obj.name) {
                            key = obj.name.split(',');
                            obj.name = key[0];
                            if (key[1]) obj.index = key[1];
                        }
                        return obj;
                    })({}, item, key));
                    return;
                }

                if ((key=item.getAttribute('tw-extend'))) {
                    self.extends.push(exts[key](self, item));
                    return;
                }

                if (item.getAttribute('tw-model')) {
                    self.models.push(item);
                }

                Array.prototype.map.call(item.attributes, function (attr) {
                    if (reg.test(attr.value)) {
                        self.attrs.push({tar:item, attr:attr, value:attr.value});
                    }
                });
                each(binds, function (fn, key) {
                    if (item.getAttribute(key)) {
                        self.binds.push(fn(self, item));
                    }
                });
            }

            if (item.innerHTML) {
                if (reg.test(item.innerHTML)) {
                    self._node(item.childNodes);
                }
            } else {
                if (regText.test(item.textContent)) {
                    self.texts.push({tar:item, value:item.textContent});
                }
            }
        });
    },

    updateWithModel: function () {
        this.updateModel();
        this.update();
        return this;
    },
    updateModel: function () {
        var self = this;
        Array.prototype.map.call(this.models, function (item, key, value) {
            /** FOR EXTEND **/
            if (item.getAttribute('tw-extend')) return;
            /** END FOR EXTEND **/

            key = item.getAttribute('tw-model');
            switch(item.type) {
                case 'checkbox':
                    item.checked = self.get(key);
                    break;
                case 'radio':
                    item.setAttribute('name', key);
                    value = item.getAttribute('tw-value');

                    if (value) {
                        item.checked = isEqual(self.get(key), self.get(value));
                    } else {
                        item.checked = String(self.get(key)) === item.value;
                    }

                    break;
                default:
                    item.value = self.get(key);
                    break;
            }
        });

        this.extends.map(function (fn) { fn(); });
    },
    update: function () {
        var self = this, reg=regUpdate;
        this.texts.map(function (obj) {
            obj.tar.textContent = obj.value.replace(reg, function (a, b) {
                return self.get(b);
            });
        });
        
        this.attrs.map(function (obj) {
            obj.tar.setAttribute(obj.attr.name, obj.value.replace(reg, function (a, b) {
                return self.get(b);
            }));
        });
        
        this.binds.map(function (fn) { fn(); });
        
        /** bellow is for tw-for**/
        this.forElements.map(function (obj) {
            obj.tar.style.display = '';
            obj.elms.map(function (elm) {
                elm.parentNode.removeChild(elm);
            });
        });
        this.forElements = [];
        
        this.fors.map(function (item) {
            var node = item.node,
                data = self.get(item.key),
                flg = document.createDocumentFragment(),
                elms = [], elm;

            each(data, function (d, key) {
                if (/^__/.test(key)) return;

                if (!item.name && !isEmpty(d) && typeof d === 'object') {
                    d.__parent = self.scope;
                    d.__index = key;
                    d.__self = d;
                    d.__update = self.scope.__update;
                    d.__notice = self.notice;
                } else {
                    d = {
                        __parent: self.scope,
                        __index: key,
                        __self: d,
                        __update: self.scope.__update,
                        __notice: self.notice
                    };
                    if (item.name) d[item.name] = d.__self;
                    if (item.index) d[item.index] = d.__index;
                }

                elm = node.cloneNode(true);
                elm.setAttribute('tw-index', key);
                elm.removeAttribute('tw-for');
                elms.push(elm);
                flg.appendChild(elm);
                
                (new Template(elm, self)).init(d).updateWithModel();
            });

            self.forElements.push({elms: elms, tar: node});
            node.parentNode.insertBefore(flg, node);
            node.style.display = 'none';
        });
        /** end tw-for **/
        Template.update.call(this);
        return this;
    },

    /** get template value -> ${...} **/
    _getKey: function (key) {
        var spl = key.split('|'),
            keys = spl[0].split('.'),
            filter = spl[1],
            args;

        if (filter) {
            filter = filter.split(':');
            args = (filter[1] || '').split(',');
            filter = filter[0];
        }
        return {
            keys: keys,
            filter: filter,
            filterArgs: args
        };
    },
    get: function (key, isFc) {
        if (!key) return null;

        key = this._getKey(key);
        var arr = key.keys, i=0, l=arr.length, obj=this.scope;
        for(i; i<l; i++) {
            if (!obj) break;
            obj = obj[arr[i]];
            if (isEmpty(obj)) obj = '';
        }
        if (key.filter) {
            obj = filters[key.filter].apply(null, [obj].concat(key.filterArgs));
        }
        
        /** isFc = true, return function object (it is use for Extends.select) **/
        if (!isFc && typeof obj === 'function') {
            return obj(this.scope);
        } else {
            return obj;    
        }
    },
    set: function (key, value) {
        if (!key) return;
        var arr = key.split('.'), i=0, l=arr.length-1, obj=this.scope, last=arr[l];
        for(i; i<l; i++) {
            obj = obj[arr[i]];
        }
        
        if (typeof obj[last] === 'function') {
            obj[last](this.scope, value);
        } else {
            obj[last] = value;    
        }
    },
    call: function (key, e) {
        if (!key) return;

        var arr = key.split('.'), i=0, l=arr.length, func=this.scope;
        for(i; i<l; i++) {
            func = func[arr[i]] || noop;
        }
        func.apply(null, [e]);
    }
};
module.exports = Template;
