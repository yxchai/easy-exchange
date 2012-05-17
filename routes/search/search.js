var dbhandle = require('../dbmodel');
var User = dbhandle.UserModel;

var search = function(req, res) {
    var session = req.session,
        user = session.user,
        query = req.query,
        name = query.name,
        bclass = query.bclass;
    var qexp = new RegExp('.*' + name + '.*');
    User.find({'books.bookname': qexp, 'books.bookclass': bclass}, function(err, doc) {
        if(!err){
            if(doc){
                var renderopt = {
                    doc: doc,
                    title: "搜索结果",
                    user: user,
                    name: name,
                    bclass: bclass,
                    category: GLOBAL.category[0].category
                };
                res.render('search/all', renderopt);
            }
        }
    });
};

module.exports = search;
