var
    Window = function (e) {
        this.e = e;
        this.hasInit = true;
        this.hasUpdate = true;
        this.scrollTop = 0;
        this.scrollLeft = 0;
    };

Window.prototype = {
    init: function () {
        this.scrollTop = this.e.scrollY || this.e.pageYOffset;
        this.scrollLeft = this.e.scrollX || this.e.pageXOffset;
        console.log(this.e);
    },
    update: function () {
        this.e.scrollTo(this.scrollLeft, this.scrollTop);
    }
};

module.exports = Window;
