var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ListSchema = new Schema({
    sellerid: String,
    buyerid: String,
    rid: String
});

ListSchema.statics.generate = function(sellerid, buyerid, cb) {
    
};

module.exports = ListSchema;
