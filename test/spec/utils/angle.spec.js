var angle = require('../../../lib/utils/angle');

describe('utils/angle', function () {
    it('should degree 0 is angle 0', function () {
        expect(angle(0)).toEqual(0);
    });

    it('should degree Math.PI/2 is angle 90', function () {
        expect(angle(Math.PI/2)).toEqual(90);
    });

    it('should degree Math.PI is angle 180', function () {
        expect(angle(Math.PI)).toEqual(180);
    });

    it('should degree Math.PI*2 is angle 360', function () {
        expect(angle(Math.PI*2)).toEqual(360);
    });
});
