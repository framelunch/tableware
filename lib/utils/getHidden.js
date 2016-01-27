module.exports = function (elm) {
    return window.getComputedStyle(elm, '').getPropertyValue('display') === 'none';
};
