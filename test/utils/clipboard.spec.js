var
    clipboard = require('utils/clipboard');

describe('clipboard', function () {
    it('should exec copy flow', function () {
        expect(clipboard('test')).toEqual('test');
    });
});
