var
    Window = function (e) {
        this.e = e;
        this.scrollTop = e.scrollY;
        this.scrollLeft = e.scrollX;
        this.hasUpdate = true;
    };

Window.prototype = {
    update: function () {
        this.e.scrollTo(this.scrollLeft, this.scrollTop);
    }
};

module.exports = function (e) {
    return new Window(e);
};
