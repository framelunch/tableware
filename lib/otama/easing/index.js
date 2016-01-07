var Back = require('./Back'),
    Bounce = require('./Bounce'),
    Circ = require('./Circ'),
    Cubic = require('./Cubic'),
    Elastic = require('./Elastic'),
    Expo = require('./Expo'),
    Quad = require('./Quad'),
    Quart = require('./Quart'),
    Quint = require('./Quint'),
    Sine = require('./Sine');

module.exports = {
    Linear: function(t,b,c,d){ return c * t / d + b; },

    backin: Back.in,
    backout: Back.out,
    backinout: Back.inout,
    backoutin: Back.outin,
    backinwith: Back.inWith,
    backoutwith: Back.outWith,
    backinoutwith: Back.inoutWith,
    backOutinwith: Back.outinWith,

    bouncein: Bounce.in,
    bounceout: Bounce.out,
    bounceinout: Bounce.inout,
    bounceoutin: Bounce.outin,

    circin: Circ.in,
    circout: Circ.out,
    circinout: Circ.inout,
    circoutin: Circ.outin,

    cubicin: Cubic.in,
    cubicout: Cubic.out,
    cubiciniut: Cubic.inout,
    cubicouton: Cubic.outin,

    elasticin: Elastic.in,
    elasticout: Elastic.out,
    elasticinout: Elastic.inout,
    elasticoutin: Elastic.outin,
    elasticinwith: Elastic.inWith,
    elasticoutwith: Elastic.outWith,
    elasticinoutwith: Elastic.inoutWith,
    elasticoutinwith: Elastic.outinWith,

    expoin: Expo.in,
    expoout: Expo.out,
    expoinout: Expo.inout,
    expooutin: Expo.outin,

    quadin: Quad.in,
    quadout: Quad.out,
    quadinout: Quad.inout,
    quadoutin: Quad.outin,

    quartin: Quart.in,
    quartout: Quart.out,
    quartinout: Quart.inout,
    quartoutin: Quart.outin,

    quintin: Quint.in,
    quintout: Quint.out,
    quintinout: Quint.inout,
    quintoutin: Quint.outin,

    sinein: Sine.in,
    sineout: Sine.out,
    sineinout: Sine.inout,
    sineoutin: Sine.outin
};
