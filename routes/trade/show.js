var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;

var show = function(req, res) {
    var body = req.body,
        session = req.session,
        user = session.user;
};

module.exports = show;
