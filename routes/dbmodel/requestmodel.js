var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RequestSchema = new Schema({
    bookid: String,
    sellerid: String,
    buyerid: String,
    count: Number
});

module.exports = RequestSchema;
