var user = require('./usermodel'),
    list = require('./listmodel'),
    request = require('./requestmodel'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/easytest');

var UserModel = mongoose.model('UserModel', user);
var ListModel = mongoose.model('ListModel', list);
var RequestModel = mongoose.model('RequestModel', request);

exports.UserModel = UserModel;
exports.ListModel = ListModel;
exports.RequestModel = RequestModel;
