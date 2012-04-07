var home = function(req, res) {
    var getsession = req.session;
    var renderopt = {};
    if(getsession.user){
        var user = getsession.user;
        console.log(user);
        renderopt = {
            title: '欢迎来到Easy-Exchange 属于您的二手书交易平台',
            user: {
                useremail: user.email,
                userid: user.id
            }
        };
    }else{
        renderopt.title = '欢迎来到Easy-Exchange 属于您的二手书交易平台';
    }
    res.render('home', renderopt);
};

var login = function(req, res) {
    res.render('login', {
        title: 'Login'
    });
};

var exit = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};

exports.home = home;
exports.login = login;
exports.exit = exit;
