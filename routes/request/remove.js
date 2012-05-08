var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;
var Request = dbhandle.RequestModel;

var remove = function(rid, buyerid, sellerid, bookid, count, cb) {
    Request.remove({_id: rid}, function(err) {
        if(!err){
            var promise = 0;
            User.removeRequest(buyerid, rid, function(success) {
                console.log('remove buyer request success');
                promise += 1;
                if(promise === 2){
                    cb('success');
                }
            });
            User.removeSellerRequest(sellerid, rid, bookid, count, function(success) {
                console.log('remove seller request success');
                promise += 1;
                if(promise === 2){
                    cb('success');
                }
            });
        }
    });
};

module.exports = remove;
