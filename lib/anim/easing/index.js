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

    BackIn: Back.in,
    BackOut: Back.out,
    BackInOut: Back.inout,
    BackOutIn: Back.outin,
    BackInWith: Back.inWith,
    BackOutWith: Back.outWith,
    BackInOutWith: Back.inoutWith,
    BackOutInWith: Back.outinWith,

    BounceIn: Bounce.in,
    BounceOut: Bounce.out,
    BounceInOut: Bounce.inout,
    BounceOutIn: Bounce.outin,

    CircIn: Circ.in,
    CircOut: Circ.out,
    CircInOut: Circ.inout,
    CircOutIn: Circ.outin,

    CubicIn: Cubic.in,
    CubicOut: Cubic.out,
    CubicInOut: Cubic.inout,
    CubicOutIn: Cubic.outin,

    ElasticIn: Elastic.in,
    ElasticOut: Elastic.out,
    ElasticInOut: Elastic.inout,
    ElasticOutIn: Elastic.outin,
    ElasticInWith: Elastic.inWith,
    ElasticOutWith: Elastic.outWith,
    ElasticInOutWith: Elastic.inoutWith,
    ElasticOutInWith: Elastic.outinWith,

    ExpoIn: Expo.in,
    ExpoOut: Expo.out,
    ExpoInOut: Expo.inout,
    ExpoOutIn: Expo.outin,

    QuadIn: Quad.in,
    QuadOut: Quad.out,
    QuadInOut: Quad.inout,
    QuadOutIn: Quad.outin,

    QuartIn: Quart.in,
    QuartOut: Quart.out,
    QuartInOut: Quart.inout,
    QuartOutIn: Quart.outin,

    QuintIn: Quint.in,
    QuintOut: Quint.out,
    QuintInOut: Quint.inout,
    QuintOutIn: Quint.outin,

    SineIn: Sine.in,
    SineOut: Sine.out,
    SineInOut: Sine.inout,
    SineOutIn: Sine.outin
};
