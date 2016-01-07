var strOfNum = require('./strOfNum'),
    _get = function(a, v)
    {
        if(v<60){
            a.unshift(strOfNum(v, 2));
            return a;
        }else{
            a.unshift(strOfNum(v%60, 2));
            return _get(a, Math.floor(v/60));
        }
    };

module.exports = function(v, len)
{
    if(isNaN(v) || v===Infinity || v===-Infinity){ return '0'; }

    var a = _get([], parseInt(v)),
        i = 0,
        l = len-a.length;

    if(l>0){
        for(i; i<l; i++){ a.unshift('00'); }
    }
    return a.join(':');
};