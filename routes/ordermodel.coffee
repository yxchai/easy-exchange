mongoose = require 'mongoose'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

OrderSchema = new Schema
  bookid: String
  quantity: Number

exports.OrderSchema = OrderSchema
