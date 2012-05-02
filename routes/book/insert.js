var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;

var addBook = function(req, res) {
    var body = req.body,
        uinfo = req.session.user,
        uid = uinfo.uid,
        obj = body.book,
        renderopt = {title: 'Error'};
    User.addBook(uid, obj, function() {
        console.log('add success');
        res.redirect('/books');
    });
};

module.exports = addBook;
