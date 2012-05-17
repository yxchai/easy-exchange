var edit = function(req, res) {
    res.render('user/edit', {
        title: '个人信息修改',
        user: req.session.user,
        category: GLOBAL.category[0].category
    });
};

module.exports = edit;
