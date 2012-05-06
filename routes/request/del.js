var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;
var Request = dbhandle.RequestModel;

var del = function(req, res) {
    var body = req.body,
        session = req.session,
        user = session.user,
        rid =  body.rid,
        buyerid = body.buyerid,
        sellerid = body.sellerid;
    Request.remove({_id: rid}, function(err) {
        if(!err){
            var promise = 0;
            User.removeRequest(buyerid, rid, function(success) {
                console.log('remove buyer request success');
                promise += 1;
                if(promise === 2){
                    res.send('success');
                }
            });
            User.removeRequest(sellerid, rid, function(success) {
                console.log('remove seller request success');
                promise += 1;
                if(promise === 2){
                    res.send('success');
                }
            });
        }
    });
};

module.exports = del;
