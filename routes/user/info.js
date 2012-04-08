var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var info = function(req, res) {
    var user = req.session.user;
    User.findByEmail(user.email, function(err, doc) {
        if(!err){
            res.render('user/info', {
                title: '个人信息',
                user: doc
            });
        }
    });
};

module.exports = info;
