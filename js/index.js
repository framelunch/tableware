var
    degree = require('utils/degree'),
    notice = require('notice'),
    cup = require('cup/'),
    spoon = require("spoon/"),
    ease = require('spoon/easing'),

    init = function () {
        var
            button = function(color){
                var twIn, twOut;
                return {
                    isPointer: true,
                    draw: function (c, b) {
                        c.fillStyle = color;
                        c.fillRect(b.x, b.y, b.w, b.h);
                    },
                    mouseover: function (e) {
                        spoon.pause(twIn, twOut);
                        twIn = spoon(this, {sy:2}, 800, 'ElasticOut');
                    },
                    mouseout: function (e) {
                        spoon.pause(twIn, twOut);
                        twOut = spoon(this, {sy:1}, 800, 'elasticOut');
                    }
                }
            };

        cup.appendTo('#main', {w:300, h:3000}).append(
            cup.sprite({x:10, y:10, sx:2, r:degree(10)}).append(
                cup.responder(button('#00ff00'), {
                    bounds:{w:50, h:50},
                    click: function () {
                        console.log('click!');
                    }
                })
            )
        );

        var svg = $('#svg1'),
            dom = $('#dom1');

        spoon.serial(
            spoon(dom, {offset: {left: 300}}, 800, 'QuartInOut'),
            spoon.to(dom, {height: 300}, 800, 'QuartOut'),
            spoon.from(dom, {height: 300}, 800, 'quartOut'),
            spoon(dom, {scaleX: 2, scaleY: 2}, 800, ease.elasticout),
            spoon(svg, {attr: {width:100}}, 800, ease.elasticout),
            spoon.from($(window), {scrollTop: 2000}, 1000, ease.quartout)
        ).play();

        $('#path1').kf({attr: {'stroke-width': 30}}, 800);
    };

init();