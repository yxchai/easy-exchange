var user = require('./usermodel'),
    list = require('./listmodel'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/easytest');

var UserModel = mongoose.model('UserModel', user);
var ListModel = mongoose.model('ListModel', list);

exports.UserModel = UserModel;
exports.ListModel = ListModel;
