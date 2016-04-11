var notice = require('notice');

describe("notice", function() {
    var callback = function (cb) {
        if (typeof cb === 'function') {
            cb();
        } else {
            expect(cb).toBe(true);
        }
    };

    it("should listen event", function() {
        notice.listen('test', callback);
        notice.publish('test', [true]);
    });
    
    it("should able be to remove listener", function() {
        notice.listen('test', callback);
        notice.clear('test', callback);
        
        notice.publish('test', [function () {
            fail("Callback has been called");
        }]);
    });
    
});
