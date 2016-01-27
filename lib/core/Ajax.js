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
        this.success = noop;
        this.error = noop;
        this.xhr = new XMLHttpRequest();

        var self = this;
        this.xhr.addEventListener('readystatechange', function (e) {
            self.onStateChange(e);
        });
    };

Ajax.prototype = {
    init: function (opt) {
        merge(this, opt);
        return this;
    },
    call: function () {
        if(!this.url){ return; }

        var xhr = this.xhr;
        xhr.open(
            this.method,
            this.method==='POST' ? this.url : (this.url+'?'+this.serial(this.data)),
            true
        );
        for(var p in this.headers) {
            xhr.setRequestHeader(p, this.headers[p]);
        }
        this.method === 'POST' ? xhr.send(this.serial(this.data)) : xhr.send();
        return this;
    },
    serial: function (data) {
        var str = '';
        for(var p in data){
            if(str!=''){ str += '&'; }
            str += p+'='+data[p];
        }
        return str;
    },
    onStateChange: function () {
        if(this.xhr.readyState===4){
            if(this.xhr.status>=200 && this.xhr.status<300 || this.xhr.status===304){
                var result = this.xhr.responseText;
                switch(this.xhr.getResponseHeader('Content-Type')) {
                    case 'application/json':
                        result = JSON.parse(result);
                        break;
                }
                this.success(result);
            } else {
                this.error(this.xhr.status);
            }
        }
    }
};

module.exports = function () {
    return new Ajax();
};
