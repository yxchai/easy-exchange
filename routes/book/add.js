var add = function(req, res) {
    var category = GLOBAL.category;
    var session = req.session,
        user = session.user;
    res.render('book/add',{
        title: '添加图书',
        user: user,
        category: category[0].category
    });
};

module.exports = add;
