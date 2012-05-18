var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BookSchema = new Schema({
    bookname: String,
    bookdesc: String,
    bookimage: {type: String, default: '/images/default.jpg'},
    bookdetail: String,
    bookcount: Number,
    bookoldrate: Number,
    bookmoney: Number,
    bookclass: String,
    booksubclass: String,
    booktags: String,
    date: {type: Date, default: Date.now}
});

BookSchema.methods.updateobj = function(obj) {
    var item;
    //var items = ['bookname', 'bookdesc', 'bookimage', 'bookcount', 'bookoldrate', 'bookmoney', 'bookclass', 'booksubclass'];
    for(item in obj){
        this[item] = obj[item] ? obj[item] : this[item];
    }
};


module.exports = BookSchema;
