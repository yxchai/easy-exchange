var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var getall = function(req, res) {
    var user = req.session.user,
        uid = user.uid;
    User.getAll(uid, function(result) {
        console.log('get all book success');
        console.log(result);
        var renderopt = {
            books: result,
            title: "所有图书",
            user: user
        };
        res.render('book/all', renderopt);
    });
};

module.exports = getall;
