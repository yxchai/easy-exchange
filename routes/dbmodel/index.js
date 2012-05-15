var user = require('./usermodel'),
    list = require('./listmodel'),
    request = require('./requestmodel'),
    order = require('./ordermodel'),
    mongoose = require('mongoose');
var boundServices = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : null;
var credentials = null;
var db = null;
if(boundServices == null){
    db = mongoose.connect('mongodb://localhost/easytest');
}else{
    credentials = boundServices['mongodb-1.8'][0]['credentials'];
    db = mongoose.connect('mongodb://' + credentials['username'] + ':' + credentials['password'] + '@' + credentials['hostname'] + ':' + credentials['port'] + '/' + credentials['db']);
}


var UserModel = mongoose.model('UserModel', user);
var ListModel = mongoose.model('ListModel', list);
var RequestModel = mongoose.model('RequestModel', request);
var OrderModel = mongoose.model('OrderModel', order);

exports.UserModel = UserModel;
exports.ListModel = ListModel;
exports.RequestModel = RequestModel;
exports.OrderModel = OrderModel;
