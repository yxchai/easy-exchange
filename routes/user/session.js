var session = function(req, res, next) {
    if(req.session.user){
        next();
    }else{
        res.redirect('/user/login?redir=' + req.url);
    }
};

module.exports = session;
