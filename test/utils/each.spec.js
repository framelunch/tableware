'use strict';

var each = require('utils/each');

describe('each', function () {
    it('should invokes function for each array element', function () {
        var col = [1, 1, 1],
            a = 0;
        each(col, function (item, index, arr) {
            expect(index).toEqual(a);
            expect(arr).toEqual(col);
            a += item;
        });
        expect(a).toEqual(3);
    });

    it('should invokes function for each object element', function () {
        var col = {'1':1, '2':2, '3':3},
            a = 0;
        each(col, function (item, key, obj) {
            expect(parseInt(key)).toEqual(item);
            expect(obj).toEqual(col);
            a += item;
        });
        expect(a).toEqual(6);
    });
});