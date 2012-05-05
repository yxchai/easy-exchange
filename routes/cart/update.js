var checksession = require('./checksession');

var update = function(req, res) {
    var body = req.body,
        session = req.session,
        bid = body.bid,
        cart = session.cart,
        count = body.count;
    var check = checksession(bid, cart);
    if(check !== false){
        cart[check].count = 0 + 1*count;
        res.redirect('/cart/show');
    }else{
        res.redirect('/cart/show');
    }
};

module.exports = update;
