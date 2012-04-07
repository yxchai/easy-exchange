var dbhandle = require('./dbmodel/');

var User = dbhandle.UserModel;

var login = function(req, res) {
    var body = req.body,
        email = body.email,
        pwd = body.password,
        renderopt = {title: '登录'};
    User.userAuth({email: email,password: pwd},function(err, result) {
        if(!err){
            req.session.user = {email: email};
            res.redirect('/');
        }else{
            renderopt.errInfo = err;
            res.render('login',renderopt);
        }
    });
};

module.exports = login;
