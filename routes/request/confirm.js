var dbhandle = require('../dbmodel');
var dbremove = require('./onlyremove');

var List = dbhandle.ListModel;
var User = dbhandle.UserModel;

var confirm = function(req, res) {
    var body = req.body,
        session = req.session,
        user = session.user;
    var buyerid = body.buyerid,
        sellerid = body.sellerid,
        count = body.count,
        rid = body.rid,
        bookid = body.bookid;
    var obj = {
        buyerid: buyerid,
        sellerid: sellerid,
        bookid: bookid,
        count: count
    };
    var tmp = new List(obj);
    tmp.save(function(err) {
        if(!err){
            User.addTrade(buyerid, sellerid, tmp._id, function(err) {
                if(!err){
                    dbremove(rid, buyerid, sellerid, function(success) {
                        if(success === 'success'){
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
