var login = function(req, res) {
    res.render('user/login', {
        title: '登录/注册'
    });
};

module.exports = login;
