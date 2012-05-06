var mongoose = require('mongoose'),
    BookSchema = require('./bookmodel'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    group: Number,
    books: [BookSchema],
    requests: [String],
    trades: [String]
});

UserSchema.path('books').default([]);
UserSchema.path('requests').default([]);
UserSchema.path('trades').default([]);

UserSchema.statics.checkEmail = function(email, cb) {
    this.findOne({email: email}, cb);
};

UserSchema.statics.userAuth = function(obj, cb) {
    this.findOne({email: obj.email}, function(err,doc) {
        if(!err){
            if(doc.password === obj.password){
                cb(err, doc);
            }else{
                cb('用户名或密码错误', doc);
            }
        }else{
            cb(err, doc);
        }
    });
};

UserSchema.statics.findByEmail = function(email, cb) {
    this.findOne({email: email}, cb);
};

UserSchema.statics.getBookById = function(bid, cb) {
    this.findOne({'books._id': bid}, function(err, doc) {
        if(!err){
            if(doc){
                var result = doc.books.id(bid);
                if(result){
                    cb(result, doc._id);
                    return;
                }
                cb(false);
                //for (var i = 0; i < doc.length; i++) {
                //    var result = doc[i].books.id(bid);
                //    if(result){
                //        cb(result, doc[i]._id);
                //        return;
                //    }
                //}
                //cb(false);
            }
        }
    });
};

UserSchema.statics.getBook = function(uid, bid, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                var result = doc.books.id(bid);
                cb(result);
            }else{
                cb(false);
            }
        }else{
            cb(false);
        }
    });
};

UserSchema.statics.getAll = function(uid, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                var result = doc.books;
                cb(result);
            }
        }
    });
};

UserSchema.statics.addBook = function(uid, obj, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                doc.addBook(obj, cb);
            }
        }
    });
};

UserSchema.statics.delBook = function(uid, bid, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                doc.delBook(bid, cb);
            }
        }
    });
};

UserSchema.statics.updateBook = function(uid, bid, obj, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                doc.updateBook(bid, obj, cb);
            }
        }
    });
};

UserSchema.statics.addRequest = function(tmpobj, cb) {
    var promise = 0,
        error = 0,
        sellerid = tmpobj.sellerid,
        buyerid = tmpobj.buyerid,
        str = tmpobj._id,
        count = tmpobj.count,
        bookid = tmpobj.bookid,
        that = this,
        onedone = function() {
            promise += 1;
            if(error){
                that.removeRequest(buyerid, str, function() {
                    //wait
                });
            }
            if(promise == 2){
                cb(false);
            }
        };
    this.findById(sellerid, function(err, doc) {
        if(!err){
            if(doc){
                doc.countReduce(bookid, count, function(err) {
                    error = err;
                    if(!err){
                        doc.addRequest(str, onedone);
                    }else{
                        that.removeRequest(sellerid, str, function() {
                            //wait
                        });
                        cb(err);
                    }
                });
            }
        }
    });
    this.findById(buyerid, function(err, doc) {
        if(!err){
            if(doc){
                doc.addRequest(str, onedone);
            }
        }
    });
};

UserSchema.statics.removeRequest = function(uid, rid, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                doc.removeRequest(rid,cb);
            }
        }
    });
};

UserSchema.statics.removeRequestById = function(uid, urid, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                doc.removeRequestById(urid, cb);
            }
        }
    });
};

//methods

UserSchema.methods.addBook = function(obj, cb) {
    this.books.push(obj);
    this.save(function(err) {
        if(!err){
            cb();
        }
    });
};

UserSchema.methods.delBook = function(bid, cb) {
    this.books.id(bid).remove();
    this.save(function(err) {
        if(!err){
            cb();
        }
    });
};

UserSchema.methods.updateBook =  function(bid, obj, cb) {
    this.books.id(bid).update(obj);
    this.save(function(err) {
        if(!err){
            cb();
        }
    });
};

UserSchema.methods.addRequest = function(str, cb) {
    this.requests.push(str);
    this.save(function(err) {
        if(!err){
            cb();
        }
    });
};

UserSchema.methods.removeRequest = function(rid, cb) {
    var exist = false;
    for (var i = 0; i < this.requests.length; i++) {
        if(this.requests[i] == rid){
            exist = true;
            this.requests.splice(i, 1);
            this.save(function(err) {
                if(!err){
                    cb(true);
                }
            });
        }
    }
    if(!exist){
        cb(false);
    }
};

UserSchema.methods.removeRequestById = function(urid, cb) {
    this.requests.id(urid).remove();
    this.save(function(err) {
        if(!err){
            cb();
        }
    });
};

UserSchema.methods.countReduce = function(bid, num, cb) {
    var book = this.books.id(bid);
    if(book.bookcount >= num){
        book.bookcount -= num;
        this.save(function(err) {
            if(!err){
                cb(false);
            }
        });
    }else{
        cb('overflow');
    }
};
module.exports = UserSchema;
