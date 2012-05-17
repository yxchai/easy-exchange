var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel;
var List = dbhandle.ListModel;

var show = function(req, res) {
    var session = req.session,
        user = session.user,
        torender = 0,
        arrlen = 0,
        renderopt = {
            title: "已确认订单",
            user: user,
            trades: [],
            category: GLOBAL.category[0].category
        };

    var render = function() {
        if(torender === arrlen){
            console.log(renderopt);
            res.render('trade/show', renderopt);
        }
    };

    var getinfo = function(doc, bookid) {
        console.log('getinfo run');
        List.findById(doc, function(err, doc) {
            if(!err){
                if(doc){
                    var tmp = {},
                        promise = 0;
                    tmp.bookid = doc.bookid;
                    tmp.count = doc.count;
                    tmp.money = doc.money;
                    User.findById(doc.buyerid, function(err, doc) {
                        if(!err){
                            if(doc){
                                delete doc.password;
                                delete doc.books;
                                delete doc.requests;
                                delete doc.trades;
                                tmp.buyer = doc;
                                promise += 1;
                                if(promise === 2){
                                    torender += 1;
                                    renderopt.trades.push(tmp);
                                    render();
                                }
                            }
                        }
                    });
                    User.findById(doc.sellerid, function(err, doc) {
                        if(!err){
                            if(doc){
                                var book = doc.books.id(tmp.bookid);
                                delete doc.password;
                                delete doc.books;
                                delete doc.requests;
                                delete doc.trades;
                                tmp.seller = doc;
                                tmp.book = book;
                                promise += 1;
                                if(promise === 2){
                                    torender += 1;
                                    renderopt.trades.push(tmp);
                                    render();
                                }
                            }
                        }
                    });
                }else{
                    torender += 1;
                    render();
                }
            }
        });
    };

    User.findById(user.uid, function(err, doc) {
        if(!err){
            if(doc){
                arrlen = doc.trades.length;
                if(arrlen !== 0){
                    for (var i = 0; i < doc.trades.length; i++) {
                        getinfo(doc.trades[i]);
                    }
                }else{
                    res.render('trade/show', renderopt);
                }
            }
        }
    });
};

module.exports = show;
