var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;

var updateBook = function(req, res) {
    var body = req.body,
        uinfo = req.session.user,
        uid = uinfo.uid,
        obj = body.book,
        bid = body.bid,
        renderopt = {title: 'Error'};
    User.updateBook(uid, bid, obj, function() {
        console.log('update success');
        res.redirect('/books/' + bid);
    });
};

module.exports = updateBook;
