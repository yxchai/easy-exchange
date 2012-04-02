mongoose = require 'mongoose'

Schema = mongoose.Schema
ObjectId = UserSchema.ObjectId

OrderSchema = new Schema
  bookid: String
  quantity: Number

exports = OrderSchema
