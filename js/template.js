'use strict';

exports.text1  = 'test text';
exports.text2  = {a:'aaaaabbbb bb'};
exports.check = true;
exports.radio = '';
exports.options = [
    {name: 'test1', value: 1},
    {name: 'test2', value: 2}
];
//exports.select = exports.options[1];
exports.arr = [1, 2, 3];

exports.data = [
    {name: 'data1', value: 'super shine'},
    {name: 'data2', value: 'humberg'},
    {name: 'data3', value: 'beline'},
    {name: 'data3', value: 'beline'}
];

exports.data2 = {
    test: {name: 'ddd', arr: [{
        a: 12, b: 33
    }]}
};

exports.onInput = function (e) {
    console.log(e.target.value);
};
exports.onChange = function (e) {
    console.log(exports.select);
};
exports.onClick = function (e) {
    exports.data.push({
        name: 'data5', value: 'running'
    });
};
exports.onCheck = function (e) {
    console.log(e.target.__scope);
};

var $ = require('$');
var template = require('ui/template')('#template', exports);

