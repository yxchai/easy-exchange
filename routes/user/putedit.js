var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var putedit = function(req, res) {
    var body = req.body,
        pwd = body.password,
        newpwd = body.newpwd,
        qq = body.qq,
        phone = body.phone,
        username = body.username,
        email = req.session.user.email;
    console.log('putedit email:' + email);
    User.userAuth({email: email, password: pwd}, function(err, result) {
        if(!err){
            if(newpwd || newpwd !== '')
                result.password = newpwd;
            if(qq || qq !== '')
                result.qq = qq;
            if(phone || phone !== '')
                console.log('phone' + phone);
                result.phone = phone;
            if(username || username !== '')
                result.username = username;
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
                            password: newpwd,
                            phone: result.phone,
                            qq: result.qq,
                            username: result.username
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
