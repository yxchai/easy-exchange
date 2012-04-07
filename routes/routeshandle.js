var regpost = require('./regpost');
var loginpost = require('./loginpost');

var homeget = require('./home');

exports.get = {
    home: homeget.home,
    login: homeget.login,
    exit: homeget.exit
};

exports.post = {
    register: regpost,
    login: loginpost
};
