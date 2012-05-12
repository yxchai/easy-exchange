var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BookSchema = new Schema({
    bookname: String,
    bookdesc: String,
    bookimg: [String],
    bookdetail: String,
    bookcount: Number,
    bookmoney: Number,
    bookclass: String,
    booksubclass: String,
    booktags: String
});

BookSchema.methods.update = function(obj) {
    var item;
    for(item in this){
        this[item] = obj[item] ? obj[item] : this[item];
    }
};


module.exports = BookSchema;
