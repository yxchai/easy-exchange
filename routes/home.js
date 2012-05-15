var dbhandle = require('./dbmodel');

var User = dbhandle.UserModel;
var List = dbhandle.ListModel;
var Order = dbhandle.OrderModel;

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
    renderopt.hotsell = [];
    renderopt.newsell = [];
    var apromise = 0;
    var torender = function() {
        apromise += 1;
        console.log('apromise      '+apromise);
        if(apromise === 2){
            res.render('home', renderopt);
        }
    };
    Order.find().desc('count').limit(10).run(function(err, doc) {
        if(!err){
            if(doc.length !== 0){
                var promise = 0;
                for (var i = 0; i < doc.length; i++) {
                    User.getBookById(doc[i].bookid, function(result) {
                        if(result){
                            renderopt.hotsell.push(result);
                        }
                        promise += 1;
                        if(promise === doc.length){
                            torender();
                        }
                    });
                }
            }else{
                torender();
            }
        }else{
            torender();
        }
    });
    User.find().select('books').desc('books.date').limit(10).run(function(err, doc) {
        if(!err){
            if(doc){
                var promise = 0;
                for (var i = 0; i < doc.length; i++) {
                    var books = doc[i].books;
                    if(books.length !== 0){
                        var tmp = books[books.length - 1];
                        renderopt.newsell.push(tmp);
                    }
                    promise += 1;
                    if(promise === doc.length){
                        torender();
                    }
                }
            }else{
                torender();
            }
        }else{
            torender();
        }
    });

};

module.exports = home;
