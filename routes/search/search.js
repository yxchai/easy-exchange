var dbhandle = require('../dbmodel');
var User = dbhandle.UserModel;

var search = function(req, res) {
    var session = req.session,
        user = session.user,
        query = req.query,
        name = query.name;
    var qexp = new RegExp('.*' + name + '.*');
    User.find({'books.bookname': qexp}, function(err, doc) {
        if(!err){
            if(doc){
                var renderopt = {
                    books: doc,
                    title: "搜索结果",
                    user: user
                };
                res.render('book/all', renderopt);
            }
        }
    });
};

module.exports = search;
