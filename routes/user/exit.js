var exit = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};

module.exports = exit;
