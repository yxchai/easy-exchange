var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;
var List = dbhandle.ListModel;

var show = function(req, res) {
    var session = req.session,
        user = session.user,
        renderopt = {
            title: '统计信息',
            user: user,
            rows: [],
            category: GLOBAL.category[0].category
        };
    var getlist = function(doc) {
        var books = doc.books;
        var lists = doc.trades;
        var bookrange = [];
        for (var i = 0; i < books.length; i++) {
            bookrange.push(books[i]._id);
        }
        console.log(lists);
        if(bookrange.length !== 0){
            List.where('_id').in(lists).where('bookid').in(bookrange).run(function(err, result) {
                if(!err){
                    if(result.length !== 0){
                        generate(books, result);
                    }else{
                        res.render('table/show', renderopt);
                    }
                }else{
                    res.render('table/show', renderopt);
                }
            });
        }else{
            res.render('table/show', renderopt);
        }
    };
    var generate = function(books, lists) {
        var rows = [];
        for (var i = 0; i < books.length; i++) {
            var tmp = {};
            var tbook = books[i];
            tmp.bookname = tbook.bookname;
            tmp.count = tbook.bookcount;
            tmp.money = tbook.bookmoney;
            tmp.outcount = 0;
            tmp.inmoney = 0;
            for (var j = 0; j < lists.length; j++) {
                var tmpl = lists[j];
                if(tmpl.bookid == tbook._id){
                    tmp.outcount = tmp.outcount + tmpl.count * 1;
                    tmp.inmoney = tmp.inmoney + tmpl.money * tmpl.count * 1;
                    lists.splice(j, 1);
                    j -= 1;
                }
            }
            rows.push(tmp);
        }
        if(lists.length !== 0){
            var obj = {};
            obj.bookname = '已删除图书';
            obj.count = '未知';
            obj.money = '未知';
            obj.outcount = 0;
            obj.inmoney = 0;
            for (var k = 0; k < lists.length; k++) {
                var tmpobj = lists[k];
                obj.outcount = obj.outcount + tmpobj.count * 1;
                obj.inmoney = obj.inmoney + tmpobj.money * tmpobj.count * 1;
            };
            rows.push(obj);
        }
        renderopt.rows = rows;
        res.render('table/show', renderopt);
    };
    User.findById(user.uid, function(err, doc) {
        if(!err){
            if(doc){
                getlist(doc);
            }
        }
    });
};

module.exports = show;
