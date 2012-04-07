var mongoose = require('mongoose'),
    OrderSchema = require('./ordermodel.js');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ListSchema = new Schema({
    orderid: [OrderSchema]
});

module.exports = ListSchema;
