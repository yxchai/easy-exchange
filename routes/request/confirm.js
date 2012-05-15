var dbhandle = require('../dbmodel');
var dbremove = require('./onlyremove');

var List = dbhandle.ListModel;
var User = dbhandle.UserModel;
var Order = dbhandle.OrderModel;

var inc = function(bookid, num) {
    var pass = function(err) {
        console.log(err);
    };
    Order.findOne({bookid: bookid}, function(err, doc) {
        if(!err){
            if(doc){
                doc.count = doc.count * 1 + num;
                doc.save(pass);
            }else{
                var tmp = new Order({bookid: bookid, count: num});
                tmp.save(pass);
            }
        }
    });
};

var confirm = function(req, res) {
    var body = req.body,
        session = req.session,
        user = session.user;
    var buyerid = body.buyerid,
        sellerid = body.sellerid,
        count = body.count,
        money = body.money,
        rid = body.rid,
        bookid = body.bookid;
    var obj = {
        buyerid: buyerid,
        sellerid: sellerid,
        bookid: bookid,
        money: money,
        count: count
    };
    var tmp = new List(obj);
    tmp.save(function(err) {
        if(!err){
            User.addTrade(buyerid, sellerid, tmp._id, function(err) {
                if(!err){
                    dbremove(rid, buyerid, sellerid, function(success) {
                        if(success === 'success'){
                            inc(bookid, count);
                            res.send('success');
                        }else{
                            res.send('failed');
                        }
                    });
                }else{
                    res.send('failed');
                }
            });
        }else{
            res.send('failed');
        }
    });
};

module.exports = confirm;
