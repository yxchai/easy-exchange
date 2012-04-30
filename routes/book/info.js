var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var info =  function(req, res) {
    var user = req.session.user,
        uid = user.uid,
        params = req.params,
        bid = params.bid;
    User.getBook(uid, bid, function(result) {
        console.log('get book success');
        var renderopt = {
            title: "图书信息",
            book: result
        };
        res.render('book/info', renderopt);
    });
};

module.exports = info;
