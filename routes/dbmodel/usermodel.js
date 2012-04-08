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
                cb(err, true);
            }else{
                cb('用户名或密码错误', false);
            }
        }else{
            cb(err, false);
        }
    });
};

UserSchema.statics.findByEmail = function(email, cb) {
    this.findOne({email: email}, cb);
};

module.exports = UserSchema;
