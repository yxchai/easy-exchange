var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RequestSchema = new Schema({
    bookid: String,
    sellerid: String,
    selleremail: String,
    buyerid: String,
    buyeremail: String,
    count: Number
});

RequestSchema.statics.getRequests = function(arr, cb) {
    this.find().where('_id').in(arr).run(function(err, doc) {
        if(!err){
            if(doc){
                cb(doc);
            }else{
                cb([]);
            }
        }else{
            cb([]);
        }
    });
};

module.exports = RequestSchema;
