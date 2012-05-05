var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;

var checkcount = function(uid, bid, count, cb) {
    User.getBook(uid, bid, function(result) {
        if(count <= result.bookcount){
            cb(true);
        }else{
            cb(false);
        }
    });
};

module.exports = checkcount;
