var checksession = require('./checksession');

var del = function(req, res) {
    var body = req.body,
        session = req.session,
        bid = body.bid,
        cart = session.cart;
    if(typeof session.cart === 'undefined' || session.cart.length === 0){
        res.send('internal error file cart del.js');
    }else{
        var check = checksession(bid, cart);
        console.log('check   '+check);
        if(check !== false){
            cart.splice(check,1);
            res.send('success');
        }else{
            res.send('item not exist');
        }
    }
};

module.exports = del;
