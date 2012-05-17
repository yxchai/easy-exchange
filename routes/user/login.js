var login = function(req, res) {
    var redir = '';
    if(req.query.redir){
        redir = req.query.redir;
    }
    res.render('user/login', {
        title: '登录/注册',
        redirect: redir ,
        category: GLOBAL.category[0].category
    });
};

module.exports = login;
