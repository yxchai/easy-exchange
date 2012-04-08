var user =  require('./user/');
var homeget = require('./home');

exports.get = {
    home: homeget.home,
    login: homeget.login,
    exit: homeget.exit,
    userinfo: homeget.userinfo
};

exports.post = {
    register: regpost,
    login: loginpost
};
