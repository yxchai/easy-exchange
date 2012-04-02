mongoose = require 'mongoose'
BookSchema = require './bookmodel.js'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

UserSchema = new Schema
  username: String
  group: Number #0 stand for the admin
  books: [BookSchema]

UserSchema.methods.initobj = (obj) ->
  @username = obj.username
  @group = obj.group

UserSchema.statics.findByName = (name, cb) ->
  @findOne username: name, cb

exports = UserSchema
