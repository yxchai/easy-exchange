var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var putedit = function(req, res) {
    var body = req.body,
        pwd = body.password,
        newpwd = body.newpwd,
        email = req.session.user.email;
    console.log('putedit email:' + email);
    User.userAuth({email: email, password: pwd}, function(err, result) {
        if(!err){
            result.password = newpwd;
            result.save(function(err) {
                if(err){
                    res.render('user/edit', {
                        title: '个人信息修改',
                        errInfo: err
                    });
                }else{
                    res.render('user/info', {
                        title: '个人信息',
                        msgInfo: '修改成功',
                        user: {
                            email: email,
                            password: newpwd
                        },
                        redirect: ''
                    });
                }
            });
        }else{
            res.render('user/edit', {
                title: '个人信息修改',
                errInfo: err
            });
        }
    });
};

module.exports = putedit;
