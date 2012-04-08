var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var add = function(req, res) {
    var body = req.body,
        email = body.email,
        renderopt = {title: 'Login'};
    User.checkEmail(email, function(err, doc) {
        if (doc) {
            renderopt.errInfo = '邮箱已使用';
            res.render('user/login', renderopt);
        }else{
            var tmpuser = new User(body);
            tmpuser.save(function(err) {
                if(err){
                    renderopt.errInfo = err;
                    res.render('user/login', renderopt);
                }else{
                    req.session.user = {email: email};
                    res.redirect('/');
                }
            });
        }
    });
};

module.exports = add;
