var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ListSchema = new Schema({
    sellerid: String,
    buyerid: String,
    bookid: String,
    money: Number,
    count: Number
});

module.exports = ListSchema;
