var dbhandle = require('../dbmodel/');
var checkcount = require('./checkcount');
var dbremove = require('./remove');

var Request = dbhandle.RequestModel,
    User = dbhandle.UserModel;


var add = function(req, res) {
    var body = req.body,
        session = req.session,
        cartitem = body.cartitem,
        user = session.user,
        arrlen = 1,
        promise = 0;
    var reqsave = function(obj, cb) {
        var newreq = new Request(obj);
        newreq.save(function(err) {
            if(!err){
                cb(newreq);
            }
        });
    };
    var tmp = cartitem;
    var obj = {
        bookid: tmp.bid,
        sellerid: tmp.uid,
        buyerid: user.uid,
        buyeremail: user.email,
        count: tmp.count
    };
    checkcount(obj.sellerid, obj.bookid, obj.count, function(err, result) {
        if(!err){
            obj.selleremail = result.email;
            var anywrong = false,
                checkrender = function(needobj) {
                    if(anywrong){
                        arrlen -= 1;
                        dbremove(needobj._id, needobj.buyerid, needobj.sellerid, needobj.bookid, needobj.count, function(success) {
                        });
                    }
                    if(promise === arrlen){
                        res.redirect('/request/show');
                    }
                };
            reqsave(obj, function(tmpobj) {
                var bookcount = result.books.id(obj.bookid).bookcount;
                bookcount = bookcount*1 - obj.count*1;
                result.books.id(obj.bookid).bookcount = bookcount;
                result.addRequest(tmpobj._id, function(err) {
                    if(!err){
                        promise += 1;
                        checkrender(tmpobj);
                    }else{
                        anywrong += err;
                    }
                });
                User.addRequest(tmpobj.buyerid, tmpobj._id, function(error) {
                    if(!error){
                        promise += 1;
                        checkrender(tmpobj);
                    }else{
                        anywrong += err;
                    }
                });
            });
        }else{
            console.log('checkcount error: ' + err);
            res.send(err);
        }
    });
};

module.exports = add;
