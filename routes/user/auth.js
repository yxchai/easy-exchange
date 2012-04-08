var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var auth = function(req, res) {
    var body = req.body,
        email = body.email,
        pwd = body.password,
        renderopt = {title: '登录'};
    User.userAuth({email: email,password: pwd},function(err, result) {
        if(!err){
            req.session.user = {email: email};
            console.log(body.redir);
            res.redirect(body.redir);
        }else{
            renderopt.errInfo = err;
            res.render('user/login',renderopt);
        }
    });
};

module.exports = auth;
