mongoose = require 'mongoose'

###
mongoose.connect 'mongodb://localhost/easy'
###

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

BookSchema = new Schema
  bookname: String
  bookdesc: String
  bookimg: [String]
  bookdetail: String
  bookcount: Number
  bookclass: String
  booktags: String

exports = BookSchema
