mongoose = require 'mongoose'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

#user:id, name, group, desc
UserSchema = new Schema
  username: String
  group: Number #0 stand for the admin, 1 for the others
  collections: [BookSchema]

#user method
UserSchema.method.initobj = (obj) ->
  @username = obj.username
  @group = obj.group

#user statics method

UserSchema.statics.findByName = (name, cb) ->
  @findOne username: name, cb


exports.UserSchema = UserSchema
exports.Schema = Schema
