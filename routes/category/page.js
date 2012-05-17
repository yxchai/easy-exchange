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
        tmp = category[cnum],
        session = req.session,
        user = session.user;
    var cate = [];
    for (var i = 0; i < tmp.subtag.length; i++) {
        var obj = {
            name: tmp.subtag[i].name,
            num: i
        };
        cate.push(obj);
    }
    User.find().where('books.bookclass', tmp.name)
    .select('books._id','books.bookclass','books.bookname', 'books.bookdesc', 'books.bookclass', 'books.booksubclass', 'books.bookcount', 'books.bookmoney', 'books.bookoldrate', 'books.bookimage')
    .run(function(err, doc) {
        if(!err){
            if(doc){
                var renderopt = {
                    title: '----分类----' + tmp.name,
                    doc: doc,
                    bookclass: tmp.name,
                    curcate: params.num,
                    cate: cate,
                    user: user,
                    category: GLOBAL.category[0].category
                };
                res.render('category/page', renderopt);
            }
        }
    });
//    User.find({'books.bookclass': tmp.name}, function(err, doc) {
//        if(!err){
//            if(doc){
//                console.log(doc);
//                res.redirect('/');
//            }
//        }
//    });
};

module.exports = page;
