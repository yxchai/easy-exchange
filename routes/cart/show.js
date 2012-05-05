var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var show = function(req, res) {
    var cart = req.session.cart,
        user = req.session.user;
    var renderopt = {
        title: '购物车',
        cart: [],
        user: user
    };
    if(cart && cart.length !== 0){
        var promise = 0;
        var getDetail = function(elem) {
            User.getBook(elem.uid, elem.bid, function(result) {
                var obj = {
                    uid: elem.uid,
                    bid: elem.bid,
                    bookname: result.bookname,
                    count: elem.count
                };
                renderopt.cart.push(obj);
                promise++;
                if(promise === cart.length){
                    res.render('cart/show', renderopt);
                }
            });
        };
        for (var i = 0; i < cart.length; i++) {
            getDetail(cart[i]);
        }
    }else{
        res.render('cart/show', renderopt);
    }
};

module.exports = show;
