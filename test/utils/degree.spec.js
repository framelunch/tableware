var degree = require('utils/degree');

describe('degree', function () {
    it('should angle 0 is degree 0', function () {
        expect(degree(0)).toEqual(0);
    });
    it('should angle 90 is degree Math.PI/2', function () {
        expect(degree(90)).toEqual(Math.PI/2);
    });
    it('should angle 180 is degree Math.PI', function () {
        expect(degree(180)).toEqual(Math.PI);
    });
});
