var OrderList, User, model;

model = require('./dbinit.js');

User = model.User;

OrderList = model.OrderList;

UserHandle.createUser = function(obj, cb) {
  var tmpUser;
  tmpUser = new User;
  tmpUser.initobj(obj);
  return tmpUser.save(function(err) {
    if (!err) {
      console.log('save success');
      return cb();
    } else {
      console.log('save failed');
      return console.log('error:#{err}');
    }
  });
};

UserHandle.removeUser = function(id, cb) {
  var callback, conditions;
  conditions = {
    _id: id
  };
  callback = function(err) {
    if (!err) {
      console.log('remove success');
      return cb();
    } else {
      console.log('remove failed');
      return console.log('error:#{err}');
    }
  };
  return User.remove(conditions, callback);
};

UserHandle.queryUser = function(name, cb) {
  console.log('now queryUser');
  User.findOne({
    username: name
  }, cb);
  return console.log('queryUser done');
};

BookHandle.insertBook = function(uid, obj, cb) {
  return User.findById(uid(callback));
};

exports.createUser = createUser;

exports.updateUser = updateUser;

exports.removeUser = removeUser;

exports.queryUser = queryUser;
