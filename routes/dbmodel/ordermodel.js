var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var OrderSchema = new Schema({
    bookid: String,
    count: Number
});

module.exports = OrderSchema;
