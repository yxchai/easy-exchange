var mongoose = require('mongoose'),
    BookSchema = require('./bookmodel'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    group: Number,
    books: [BookSchema]
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

UserSchema.statics.addBook = function(uid, obj, cb) {
    this.findOne({_id: uid}, function(err, doc) {
        if(!err){
            if(doc){
                doc.addBook(obj, cb);
            }
        }
    });
};

UserSchema.statics.delBook = function(uid, bid, cb) {
    this.findOne({_id: uid}, function(err, doc) {
        if(!err){
            if(doc){
                doc.delBook(bid, cb);
            }
        }
    });
};

UserSchema.statics.updateBook = function(uid, bid, obj, cb) {
    this.findOne({_id: uid}, function(err, doc) {
        if(!err){
            if(doc){
                doc.delBook(bid, obj, cb);
            }
        }
    });
};

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

module.exports = UserSchema;
