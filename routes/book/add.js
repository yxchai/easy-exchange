var add = function(req, res) {
    res.render('book/add',{
        title: '添加图书'
    });
};

module.exports = add;
