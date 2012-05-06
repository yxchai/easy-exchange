var edit = function(req, res) {
    res.render('user/edit', {
        title: '个人信息修改',
        user: req.session.user
    });
};

module.exports = edit;
