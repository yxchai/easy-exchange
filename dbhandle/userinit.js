var ObjectId, Schema, UserSchema, mongoose;

mongoose = require('mongoose');

Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

UserSchema = new Schema({
  username: String,
  group: Number,
  collections: [BookSchema]
});

UserSchema.method.initobj = function(obj) {
  this.username = obj.username;
  return this.group = obj.group;
};

UserSchema.statics.findByName = function(name, cb) {
  return this.findOne({
    username: name
  }, cb);
};

exports.UserSchema = UserSchema;

exports.Schema = Schema;
