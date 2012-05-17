var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var auth = function(req, res) {
    var body = req.body,
        email = body.email,
        pwd = body.password,
        renderopt = {
            title: '登录',
            category: GLOBAL.category[0].category
        };
    User.userAuth({email: email,password: pwd},function(err, result) {
        if(!err){
            req.session.user = {email: email, uid: result._id};
            console.log(body.redir);
            res.redirect(body.redir);
        }else{
            renderopt.errInfo = err;
            renderopt.redirect = body.redir;
            res.render('user/login',renderopt);
        }
    });
};

module.exports = auth;
