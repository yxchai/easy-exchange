var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RequestSchema = new Schema({
    bookid: String,
    sellerid: String,
    selleremail: String,
    buyerid: String,
    buyeremail: String,
    money: Number,
    count: Number
});

RequestSchema.statics.getRequests = function(arr, cb) {
    this.find().where('_id').in(arr).run(cb);
};

module.exports = RequestSchema;
