var
    clipboard = require('../../../lib/utils/clipboard');

describe('clipboard', function () {
    it('should exec copy flow', function () {
        GLOBAL.document = {
            body: {
                appendChild: function (elm) {
                    expect(elm.value).toEqual('test');
                },
                removeChild: function (elm) {
                    expect(elm.value).toEqual('test');
                }
            },
            execCommand: function (val) {
                expect(val).toEqual('copy');
            },
            createElement: function (name) {
                if (name === 'input') {
                    return new Input();
                } else {
                    fail("element name is not 'input!!!'");
                }
            }
        };
        var Input = function () {
                this.value = '';
                this.select = function () {
                    expect(this.value).toEqual('test');
                };
            };
        
        clipboard('test');
    });
});
