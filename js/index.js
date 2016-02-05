var
    o = require('o'),
    oC = require('canvas'),
    oA = require("anim"),

    getStyle = require('utils/getStyle'),

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
                oC.responder(button(), {
                    color: '#00ff00',
                    bounds:{w:50, h:50},
                    click: function () {
                        console.log('click!');
                    }
                })
            ),
            oC.sprite({id:'sp', x:20, y:20})
        );
        oC('sp').append(
            oC.sprite({x:50, y:50, sx:3}).append(
                oC.view({draw: function(c){
                    c.fillStyle = '#ff0000';
                    c.fillRect(0, 0, 50, 50);
                }})
            )
        );

        oC('sp').attr({sy: 5});

        var oDom1 = o('#dom1', {hidden: true}),
            oWin = o(window),
            oDiv = o('<div>');

        oDom1.addClass('class2');

        oDom1.append(
            oDiv,
            o('<div>', {id: 'aaa'})
        );
        oDom1.append('<div id="b"></div>');
        oDom1.hidden(false);

        console.log(o('aaa'));

        console.log(333, getStyle(oDom1[0], 'border-top-color'));
        oDom1.css({'background-color': '#ff0000'});
        console.log(1234, getStyle(o('#dom1')[0], 'background-color'));

        oA.serial(
            //oA.to(oDom1, {x:10, y:10}),
            oA.to(oDom1, {x:10, y:50, degree:10, sx:2}, 800, oA.QuartInOut),
            oA.to(oDom1, {x:100, degree:0}, 800, oA.QuartInOut),
            oA.to(oDom1, {height:10, css:{'border-color': '#00ffff'}}, 800, oA.QuartInOut),
            oA.to('#svg1', {width:100}, 800, oA.ElasticOut),
            oA.from(window, {scrollTop: 2000}, 1000, oA.QuartOut),
            oA.to(oWin, {scrollTop: 10}, 500),
            oA.from('#overflow', {scrollTop: 200}, 1000, oA.QuintOut),
            oA.to('#overflow', {scrollTop: 20, css:{overflow:'hidden'}}, 1000),
            oA.to('#of2', {opacity:0.2}, 500)
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