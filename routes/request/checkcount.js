var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;

var checkcount = function(uid, bid, count, cb) {
    User.getBook(uid, bid, function(err, result, doc) {
        if(!err){
            if(count <= result.bookcount){
                cb(false, doc);
            }else{
                cb('overflow');
            }
        }else{
            cb(err);
        }
    });
};

module.exports = checkcount;
