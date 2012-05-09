var dbhandle = require('../dbmodel');

var List = dbhandle.ListModel;
var confirm = function(req, res) {
    var body = req.body,
        session = req.session,
        user = session.user;
    var buyerid = body.buyerid,
        sellerid = body.sellerid,
        count = body.count,
        bookid = body.bookid;
    var obj = {
        buyerid: buyerid,
        sellerid: sellerid,
        bookid: bookid,
        count: count
    };
    var tmp = new List(obj);
    tmp.save(function(err) {
        //please insert listid into user object
        if(!err){
            res.redirect('/trade/show/' + tmp._id);
        }else{
            res.redirect('/request/show');
        }
    });
};

module.exports = confirm;
