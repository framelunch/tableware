describe("function-appendLi", function() {
    beforeEach(function() {
        document.body.innerHTML = __html__['.tmp/index.html'];
    });
    
    it(".test1 length should be 3", function() {
        var main = $('.test1');
        expect(main.length).toEqual(3);
    });
});
