var dbremove = require('./remove');

var del = function(req, res) {
    var body = req.body,
        session = req.session,
        user = session.user,
        rid =  body.rid,
        buyerid = body.buyerid,
        sellerid = body.sellerid;
    dbremove(rid, buyerid, sellerid, function(success) {
        res.send(success);
    });
};

module.exports = del;
