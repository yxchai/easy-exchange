var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;
var Request = dbhandle.RequestModel;

var delBook = function(req, res) {
    var params = req.params,
        uinfo = req.session.user,
        uid = uinfo.uid,
        renderopt = {title: 'Error'};
    var removeRequest = function(bid) {
        Request.where('bookid', bid).remove(function(err) {
            if(!err){
                console.log('delbook request remove success');
            }
        });
    };
    console.log(params);
    User.delBook(uid, params.bid, function() {
        console.log('add success');
        removeRequest(params.bid);
        res.redirect('/books/');
    });
};

module.exports = delBook;
