var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;

var delBook = function(req, res) {
    var body = req.body,
        uinfo = req.session.user,
        uid = uinfo.uid,
        renderopt = {title: 'Error'};
    User.addBook(uid, bid, function() {
        console.log('add success');
        res.redir('/');
    });
};

module.exports = delBook;
