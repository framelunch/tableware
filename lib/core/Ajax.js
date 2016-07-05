'use strict';

var
    noop = require('../utils/noop'),
    merge = require('../utils/merge'),

    Ajax = function () {
        this.method = 'POST';
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        this.url = '';
        this.data = {};
        this.callback = noop;
        this.xhr = new XMLHttpRequest();
        this.xhr.addEventListener('readystatechange', this.onStateChange.bind(this));
    };

Ajax.prototype = {
    init: function (opt) {
        merge(this, opt);
        return this;
    },
    send: function () {
        if(!this.url){ return; }

        var xhr = this.xhr;
        xhr.open(
            this.method,
            (/POST|PUT/.test(this.method) || Object.keys(this.data).length===0) ? this.url : (this.url+'?'+this.serial(this.data)),
            true
        );
        for(var p in this.headers) {
            xhr.setRequestHeader(p, this.headers[p]);
        }

        (/POST|PUT/.test(this.method)) ? xhr.send(this.serial(this.data)) : xhr.send();
        return this;
    },
    serial: function (data) {
        var str = '';
        if (this.method==='GET' || this.headers['Content-Type']==='application/x-www-form-urlencoded') {
            for(var p in data){
                if(str!==''){ str += '&'; }
                str += p+'='+data[p];
            }
        } else {
            str = JSON.stringify(data);
        }
        return str;
    },
    onStateChange: function () {
        if(this.xhr.readyState===4){
            if(this.xhr.status>=200 && this.xhr.status<300 || this.xhr.status===304){
                var
                    result = this.xhr.responseText,
                    cType = this.xhr.getResponseHeader('Content-Type');

                if (cType.indexOf('application/json') > -1) {
                    result = JSON.parse(result);
                }
                this.callback(null, result);
            } else {
                this.callback(this.xhr.status, this.xhr.responseText);
            }
        }
    }
};

module.exports = function () {
    return new Ajax();
};
