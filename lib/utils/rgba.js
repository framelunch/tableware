module.exports = function (str) {
    if (str.charAt(0) === '#') {
        return {
            r: parseInt('0x' + str.substr(1, 2)),
            g: parseInt('0x' + str.substr(3, 2)),
            b: parseInt('0x' + str.substr(5, 2)),
            a: 1
        };
    } else {
        var arr = (str.match(/^r.+\)/g) || ['rgb(0,0,0)'])[0].match(/\d+(\.\d+)?/g);
        return {
            r: parseInt(arr[0]),
            g: parseInt(arr[1]),
            b: parseInt(arr[2]),
            a: parseFloat(arr[3] || 1)
        }
    }
};
