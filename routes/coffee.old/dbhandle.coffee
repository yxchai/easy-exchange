user = require './usermodel'
list = require './listmodel'
mongoose = require 'mongoose'
mongoose.connect 'mongodb://localhost/easytest'

UserModel = mongoose.model 'UserModel', user.UserSchema
ListModel = mongoose.model 'ListModel', list.ListSchema

exports.UserModel = UserModel
exports.ListModel = ListModel
