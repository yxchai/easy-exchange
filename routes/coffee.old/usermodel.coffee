mongoose = require 'mongoose'
BookSchema = require './bookmodel.js'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

UserSchema = new Schema
  username: String
  email: String
  password: String
  group: Number #0 stand for the admin
  books: [BookSchema]

UserSchema.statics.checkEmail = (email) ->
  check = (err, doc) ->
    if doc and not err
      true
    else
      false
  @findOne email: email, check
  


UserSchema.statics.findByName = (name, cb) ->
  @findOne username: name, cb

exports.UserSchema = UserSchema
