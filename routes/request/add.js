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
                cb(newreq);
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
                buyeremail: user.email,
                count: tmp.count
            };
            User.findById(tmp.uid, function(err, doc) {
                if(!err){
                    if(doc){
                        obj.selleremail = doc.email;
                        reqsave(obj, function(tmpobj) {
                            User.addRequest(tmpobj, function(error) {
                                if(!error){
                                    console.log('no err');
                                    promise += 1;
                                }else{
                                    console.log('tmpobj._id  ' + tmpobj._id);
                                    Request.remove({_id: tmpobj._id}, function(err) {
                                        console.log('remove err  ' + err);
                                    });
                                    arrlen -= 1;
                                }
                                if(promise === arrlen){
                                    res.send('success');
                                }
                            });
                        });
                    }
                }
            });
        }
    }
};

module.exports = add;
