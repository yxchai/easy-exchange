var dbhandle = require('../dbmodel');

var User = dbhandle.UserModel,
    Request = dbhandle.RequestModel;

var show = function(req, res) {
    var session = req.session,
        user = session.user,
        promise = 0,
        arrlen = 0;
    var renderpage = function(doc) {
        var renderopt = {
            title: '请求列表',
            user: user,
            requests: []
        };
        if(typeof doc === 'undefined' || doc === null || doc.length ===0){
            res.render('request/show', renderopt);
        }else{
            renderopt.requests = doc;
            res.render('request/show', renderopt);
        }
    };
    var getDetail = function(num, doc) {
        User.getBookById(doc[num].bookid, function(result) {
            if(result){
                doc[num].bookname = result.bookname;
            }
            promise++;
            if(promise === doc.length){
                renderpage(doc);
            }
        });
    };
    var queryRequest = function(doc) {
        var requests = doc.requests;
        if(typeof requests === 'undefined' || requests.length === 0){
            renderpage();
        }else{
            Request.getRequests(requests, function(err, result) {
                if(!err){
                    if(result){
                        if(result.length !== 0){
                            for (var i = 0; i < result.length; i++) {
                                getDetail(i, result);
                            }
                        }else{
                            requests = [];
                            doc.save();
                            renderpage();
                        }
                    }
                }
            });
        }
    };
    User.findById(user.uid, function(err, doc) {
        if(!err){
            if(doc){
                queryRequest(doc);
            }
        }
    });
};

module.exports = show;
