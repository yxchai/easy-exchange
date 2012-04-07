var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BookSchema = new Schema({
    bookname: String,
    bookdesc: String,
    bookimg: [String],
    bookdetail: String,
    bookcount: Number,
    bookclass: String,
    booktags: String
});

module.exports = BookSchema;
