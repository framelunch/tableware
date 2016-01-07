module.exports = function (l, b)
{
    l = l || 8;

    var s = '',
        a = ('abcdefghijklmnopqrstuvwxyz'+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+'0123456789'+b).split(''),
        i = 0, al = a.length;

    for(i; i<l; i++) {
        s += a[Math.floor(Math.random() * al)];
    }
    return s;
};
