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
    deals: [String]
});

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
    this.find({}, function(err, doc) {
        if(!err){
            if(doc){
                for (var i = 0; i < doc.length; i++) {
                    var result = doc[i].books.id(bid);
                    if(result){
                        cb(result, doc[i]._id);
                        return;
                    }
                }
                cb(false);
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
            }
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

UserSchema.statics.addRequest = function(uid, str, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                doc.addRequest(str, cb);
            }
        }
    });
};

UserSchema.statics.removeRequest = function(uid, rid, cb) {
    this.findById(uid, function(err, doc) {
        if(!err){
            if(doc){
                doc.removeRequest(str,cb);
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
    for (var i = 0; i < this.requests.length; i++) {
        if(this.requests[i] == rid){
            this.requests[i].remove();
            this.save(function(err) {
                if(!err){
                    cb(true);
                    return;
                }
            });
        }
    }
    cb(false);
};

module.exports = UserSchema;
