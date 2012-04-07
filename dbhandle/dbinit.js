var BookSchema, ObjectId, OrderList, OrderListSchema, OrderSchema, Schema, User, UserSchema, mongoose;

mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project1');

Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

UserSchema = new Schema({
  username: String,
  group: Number,
  collections: [BookSchema]
});

UserSchema.methods.initobj = function(obj) {
  this.username = obj.username;
  return this.group = obj.group;
};

UserSchema.statics.findByName = function(name, cb) {
  return this.findOne({
    username: name
  }, cb);
};

BookSchema = new Schema({
  bookname: String,
  bookdesc: String,
  bookimg: [String],
  bookdetail: String,
  bookcount: Number
});

OrderSchema = new Schema({
  bookid: ObjectId,
  count: Number
});

OrderListSchema = new Schema({
  orderid: [OrderSchema]
});

User = mongoose.model('User', UserSchema);

OrderList = mongoose.model('OrderList', OrderListSchema);

exports.User = User;

exports.OrderList = OrderList;
