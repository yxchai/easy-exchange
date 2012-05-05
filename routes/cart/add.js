var checksession = require('./checksession');

var add = function(req, res) {
    var body = req.body,
        session = req.session;
    if(typeof session.cart === 'undefined' || session.cart.length === 0){
        session.cart = [];
    }
    var cart = session.cart;
    var obj = {
        count: body.count,
        bid: body.bid,
        uid: body.uid
    };
    var check = checksession(obj.bid, cart);
    if(check !== false){
        cart[check].count =cart[check].count*1 + obj.count*1;
    }else{
        cart.push(obj);
    }
    res.json({success: true});
};

module.exports = add;
