var kvs = require('kvs');

describe("kvs", function() {
    it("should get a setting value", function() {
        kvs.set('get', 10);
        expect(kvs.get('get')).toEqual(10);
    });
    it("should get a setting object", function() {
        kvs.set('get2', {a:10, b:{a: 20}});
        expect(kvs.get('get2 a')).toEqual(10);
        expect(kvs.get('get2 b.a')).toEqual(20);
    });

    it("should listen a setting value", function() {
        kvs.listen('listen', function (value) {
            expect(value).toEqual(10);
        });
        kvs.set('listen', 10);
    });

    it('should able be to remove listener', function () {
        var cb = function () {
            fail('Callback has bee called');
        };
        kvs.listen('notListen', cb);
        kvs.clear('notListen', cb);
        kvs.set('notListen', 10);
    });

    it("should bind a setting value", function() {
        var obj1 = {},
            obj2 = {result: function (value) {
                expect(value).toEqual(20);
            }};
        kvs.bind('bind1', obj1, 'result');
        kvs.bind('bind2', obj2, 'result');
        kvs.set('bind1', 20);
        kvs.set('bind2', 20);

        expect(obj1.result).toEqual(20);
    });

    it("should bind a setting object value", function() {
        var obj1 = {};
        kvs.bind('bind3 a', obj1, 'result');
        kvs.set('bind3', {a: 10, b: 20});

        expect(obj1.result).toEqual(10);
    });
});