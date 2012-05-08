var dbremove = require('./remove');

var reject = function(req, res) {
    var body = req.body,
        session = req.session,
        user = session.user,
        rid =  body.rid,
        buyerid = body.buyerid,
        sellerid = body.sellerid,
        bookid = body.bookid,
        count = body.count;
    dbremove(rid, buyerid, sellerid, bookid, count, function(success) {
        res.send(success);
    });
};

module.exports = reject;
