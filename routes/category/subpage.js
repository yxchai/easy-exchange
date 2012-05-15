var dict = {
    fiction: 0,//'小说',
    pop: 1,//'流行',
    culture: 2,//'文化',
    life: 3,//'生活',
    eco: 4,//'经管',
    tech: 5//'科技'
};

var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;

var page = function(req, res) {
    var category = GLOBAL.category[0].category;
    var params = req.params,
        cnum = dict[params.num],
        tmp = category[cnum].subtag[params.subnum],
        session = req.session,
        user = session.user;
    User.find().where('books.booksubclass', tmp.name)
    .select('books._id','books.bookclass','books.bookname', 'books.bookdesc', 'books.bookclass', 'books.booksubclass', 'books.bookcount', 'books.bookmoney', 'books.bookoldrate', 'books.bookimage')
    .run(function(err, doc) {
        if(!err){
            if(doc){
                var renderopt = {
                    title: '----分类----' + tmp.name,
                    doc: doc,
                    booksubclass: tmp.name,
                    user: user
                };
                res.render('category/subpage', renderopt);
            }
        }
    });
};

module.exports = page;
