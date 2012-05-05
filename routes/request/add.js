var dbhandle = require('../dbmodel/');

var Request = dbhandle.RequestModel,
    User = dbhandle.UserModel;


var add = function(req, res) {
    var body = req.body,
        session = req.session,
        cartitem = body.cartitem,
        user = session.user,
        arrlen = cartitem.length,
        promise = 0;
    var reqsave = function(obj, cb) {
        var newreq = new Request(obj);
        newreq.save(function(err) {
            if(!err){
                cb(obj);
            }
        });
    };
    if(cartitem.length !== 0){
        for (var i = 0; i < cartitem.length; i++) {
            var tmp = cartitem[i];
            var obj = {
                bookid: tmp.bid,
                sellerid: tmp.uid,
                buyerid: user.uid,
                count: tmp.count
            };
            reqsave(obj, function(tmpobj) {
                // add to the user request
            });
        }
    }
};

module.exports = add;
