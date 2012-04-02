mongoose = require 'mongoose'
OrderSchema = require './ordermodel.js'

Schema = mongoose.Schema
ObjectId = UserSchema.ObjectId

ListSchema = new Schema
  orderid: [OrderSchema]

exports = ListSchema
