'use strict';

var
    looptime = require('../utils/looptime'),
    each = require('../utils/each'),
    dateFormat = require('../utils/dateFormat'),
    
    ext = {
        datePicker: require('./date-picker') 
    },
    filter = {
        date: function (date, format) {
            return dateFormat(date, format);
        }
    },
    
    Template = function (query) {
        this.root = typeof query === 'string' ? document.querySelector(query) : query;
        this.forElements = [];
        this.binds = [];
        this.fors = [];
        this.scope = null;
    }
    ;

Template.prototype = {
    init: function (obj) {
        this.scope = obj;
        this.setEvent();
        this.setModel();
        this.setOption();
        this.setBinds();
        this.update();
        return this;
    },
    setEvent: function () {
        var self = this;
        this.root.addEventListener('click', function (e) {
            var tar = e.target,
                key = tar.getAttribute('tw-click');

            if (key) {
                self.call(tar.getAttribute('tw-click'), e);
                setTimeout(self.update.bind(self), looptime);
            }
        });

        this.root.addEventListener('input', function (e) {
            var tar = e.target,
                key = tar.getAttribute('tw-model');

            if (tar.getAttribute('tw-extend')) return;
            if (key && /text|password|number|email/.test(tar.type)) {
                self.set(key, tar.value);
                setTimeout(self.update.bind(self), looptime);
            }
            self.call(tar.getAttribute('tw-change'), e);
        });

        this.root.addEventListener('change', function (e) {
            var tar = e.target,
                key = tar.getAttribute('tw-model');

            if (tar.getAttribute('tw-extend')) return;
            if (key && (/checkbox|radio/.test(tar.type) || tar.tagName==='SELECT')) {
                if (tar.tagName === 'SELECT') {
                    self.set(key, self.scope[tar.getAttribute('tw-option')][tar.selectedIndex]);
                } else {
                    switch(tar.type) {
                        case 'checkbox':
                            self.set(key, tar.checked);
                            break;
                        default :
                            self.set(key, tar.value);
                            break;
                    }
                }
                setTimeout(self.update.bind(self), looptime);
            }
            self.call(tar.getAttribute('tw-change'), e);
        });
    },
    setModel: function () {
        var self = this;
        this.each(this.root.querySelectorAll('[tw-model]'), function (item, key) {
            /** FOR EXTEND **/
            key = item.getAttribute('tw-extend');
            if (key) {
                ext[key].template(self, item);
                return;
            }
            /** END FOR EXTEND **/

            key = item.getAttribute('tw-model');
            switch(item.type) {
                case 'checkbox':
                    item.checked = self.get(key);
                    break;
                case 'radio':
                    item.setAttribute('name', key);
                    item.checked = self.get(key) === item.value;
                    break;
                default:
                    if (item.tagName!=='SELECT') item.value = self.get(key);
                    break;
            }
        });
    },
    setOption: function () {
        var self = this;
        this.each(this.root.querySelectorAll('[tw-option]'), function (item) {
            var opt = item.getAttribute('tw-option'),
                key = item.getAttribute('tw-model'),
                options = self.scope[opt], i=0, l=options.length, body='', index=-1;
            for(i; i<l; i++) {
                body += '<option>' + options[i].name + '</option>';
                if (options[i] === self.scope[key]) index = i;
            }
            item.innerHTML = body;
            item.selectedIndex = index;
        });
    },
    setBinds: function () {
        this.binds = [];
        this._binds(this.root.childNodes);
    },
    _binds: function (nodes) {
        var reg=/\${[^{}]+}/, self=this;

        this.each(nodes, function (item) {
            if (item.getAttribute && item.getAttribute('tw-for')){
                self.forElements.push(item);
                return;
            }

            if (/INPUT|SELECT/.test(item.tagName)) {
                item.__scope = self.scope;
            }

            if (item.innerHTML) {
                if (reg.test(item.textContent)) {
                    self._binds(item.childNodes);
                }
            } else {
                if (reg.test(item.textContent)) {
                    self.binds.push({tar:item, value:item.textContent});
                }
            }
        });
    },
    update: function () {
        var self = this, reg=/\${([^{}]+)}/g;
        this.each(this.binds, function (obj) {
            obj.tar.textContent = obj.value.replace(reg, function (a, b) {
                return self.get(b);
            });
        });
        /** bellow is for tw-for**/
        this.each(this.fors, function (obj) {
            obj.tar.style.display = '';
            self.each(obj.elms, function (elm) {
                elm.parentNode.removeChild(elm);
            });
        });
        this.fors = [];

        this.each(this.forElements, function (node) {
            var data=self.scope[node.getAttribute('tw-for')],
                flg = document.createDocumentFragment(),
                elms=[], elm;

            each(data, function (d, key) {
                d.__parent = self.scope;
                d.__index = key;
                
                elm = node.cloneNode(true);
                elm.setAttribute('tw-index', key);
                elm.removeAttribute('tw-for');
                elms.push(elm);
                flg.appendChild(elm);
                (new Template(elm)).init(d);
            });
            
            self.fors.push({elms: elms, tar: node});
            node.parentNode.insertBefore(flg, node);
            node.style.display = 'none';
        });
        /** end tw-for **/
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
            args = filter[1];
            filter = filter[0];
        }
        return {
            keys: keys,
            filter: filter,
            filterArgs: args
        };
    },
    get: function (key) {
        if (!key) return undefined;

        key = this._getKey(key);
        var arr = key.keys, i=0, l=arr.length, obj=this.scope;
        for(i; i<l; i++) {
            if (!obj) {
                obj='';
                break;
            }
            obj = obj[arr[i]];
        }
        if (key.filter) {
            obj = filter[key.filter].call(null, obj, key.filterArgs);
        }
        return obj;
    },
    set: function (key, value) {
        if (!key) return;
        var arr = key.split('.'), i=0, l=arr.length-1, obj=this.scope;
        for(i; i<l; i++) {
            obj = obj[arr[i]];
        }
        obj[arr[l]] = value;
    },
    each: function (col, func) {
        for(var i= 0, l=col.length; i<l; i++) {
            func(col[i], i, col);
        }
    },
    call: function (key, e) {
        if (!key) return;
        
        var func = this.scope[key];
        if (func) func.apply(null, [e]);
    }
};

module.exports = function (id, scope) {
    return (new Template(id)).init(scope);
};
