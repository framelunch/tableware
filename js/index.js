var
    oC = require('canvas/'),
    oA = require("anim/"),

    init = function () {
        var
            button = function(){
                var twIn, twOut;
                return {
                    isPointer: true,
                    draw: function (c, b) {
                        c.fillStyle = this.color;
                        c.fillRect(b.x, b.y, b.w, b.h);
                    },
                    mouseover: function (e) {
                        oA.pause(twIn, twOut);
                        twIn = oA(this, {sy:2, color:'#006655'}, 800, oA.ElasticOut);
                    },
                    mouseout: function (e) {
                        oA.pause(twIn, twOut);
                        twOut = oA(this, {sy:1, color:'#00ff00'}, 800, oA.ElasticOut);
                    }
                }
            };

        oC.appendTo('body', {id:'test', w:300, h:3000}).append(
            oC.sprite({x:10, y:10, sx:2, degree:10}).append(
                oC.responder(button('#00ff00'), {
                    color: '#00ff00',
                    bounds:{w:50, h:50},
                    click: function () {
                        console.log('click!');
                    }
                })
            )
        );

        oA('#dom1', {sx:3});
        oA.serial(
            oA.to('#dom1', {x:10, y:50, degree:10, sx:2}, 800, oA.QuartInOut),
            oA.to('#dom1', {x:100, degree:0}, 800, oA.QuartInOut),
            oA.to('#dom1', {css: {height: 400}}, 800, oA.QuartInOut),
            oA.to('#path1', {degree: 20, attr: {'stroke-width': 30, 'stroke': '#ff0000'}}, 800, oA.QuintOut),
            oA.to('#svg1', {css: {width: 100}}, 800, oA.ElasticOut),
            oA.from(window, {scrollTop: 2000}, 1000, oA.QuartOut),
            oA.from('#overflow', {scrollTop: 200}, 1000, oA.QuintOut)
        ).play();
    };

init();