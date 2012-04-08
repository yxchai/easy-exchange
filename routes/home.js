var home = function(req, res) {
    var getsession = req.session;
    var renderopt = {};
    if(getsession.user){
        var user = getsession.user;
        console.log('homepage'+user.email||'');
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

module.exports = home;
