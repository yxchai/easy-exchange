var info = function(req, res) {
    res.render('user/info', {
        title: '个人信息'
    });
};

module.exports = info;
