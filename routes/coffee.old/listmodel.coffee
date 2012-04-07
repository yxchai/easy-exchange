mongoose = require 'mongoose'
OrderSchema = require './ordermodel.js'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

ListSchema = new Schema
  orderid: [OrderSchema]

exports.ListSchema = ListSchema
