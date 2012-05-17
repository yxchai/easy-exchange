var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var info =  function(req, res) {
    var params = req.params,
        bid = params.bid,
        user = req.session.user;
    User.getBookById(bid, function(result, uid) {
        if(result && uid){
            console.log('get book success'+uid);
            var renderopt = {
                title: "图书信息",
                book: result,
                user: user,
                uid: uid,
                category: GLOBAL.category[0].category
            };
            res.render('book/info', renderopt);
        }else{
            res.redirect('/');
        }
    });
};

module.exports = info;
