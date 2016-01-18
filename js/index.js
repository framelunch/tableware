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
            oA.to('#dom1', {css: {height: 200}}, 800, oA.QuartInOut),
            oA.to('#svg1', {css: {width: 100}}, 800, oA.ElasticOut),
            //oA.from(window, {scrollTop: 2000}, 1000, oA.QuartOut),
            oA.from('#overflow', {scrollTop: 200}, 1000, oA.QuintOut)
        ).play();


        var d = 'M34,238.035c-2.2,0-4.552-1.713-5.228-3.807l-17.545-84.422c-0.675-2.094-0.675-5.521,0-7.614l17.545-84.421c0.675-2.094,3.027-3.807,5.228-3.807h232c2.2,0,4.553,1.713,5.229,3.807l17.545,84.421c0.675,2.094,0.675,5.521,0,7.614l-17.545,84.422c-0.676,2.094-3.027,3.807-5.229,3.807H34z';

        //console.log(d.match(/[MLHVCSQTAZmlhvcsqtaz]|\-?\d+(\.\d+)?/g));

        oA.serial(
            oA.to('#path1', {attr:{
                d: d
                //d: 'M287.885,145.611c1.953,1.953,1.953,5.119,0.001,7.071l-134.351,93.62c-1.952,1.952-5.118,1.952-7.07,0l-134.351-93.62c-1.952-1.952-1.952-5.118,0.001-7.071l134.35-93.804c1.953-1.953,5.118-1.952,7.07,0L287.885,145.611z'
            }}),
            oA.to('#path1', {
                degree: 20,
                attr: {
                    'stroke-width': 30,
                    'stroke': '#ff0000'
                }
            }, 800, oA.QuintOut)
        ).play();
    };

init();