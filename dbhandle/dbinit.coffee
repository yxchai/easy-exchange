mongoose = require 'mongoose'
mongoose.connect 'mongodb://localhost/project1'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

#user: id, name, group, desc
UserSchema = new Schema 
  username: String
  group: Number  #0 stand for the admin, 1 for the others
  collections: [BookSchema]

#user method
UserSchema.methods.initobj = (obj) ->
  @username = obj.username
  @group = obj.group
  
#user statics
UserSchema.statics.findByName = (name,cb) ->
  @findOne username: name, cb



#book: id, name, desc, img, detail, count
BookSchema = new Schema
  bookname: String
  bookdesc: String
  bookimg: [String]
  bookdetail: String
  bookcount: Number

#order: bookid,count
OrderSchema = new Schema
  bookid: ObjectId
  count: Number

#orderlist: order
OrderListSchema = new Schema
  orderid: [OrderSchema]

User = mongoose.model 'User', UserSchema
OrderList = mongoose.model 'OrderList', OrderListSchema

exports.User = User
exports.OrderList = OrderList
