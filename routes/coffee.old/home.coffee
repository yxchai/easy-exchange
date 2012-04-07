home = (req, res) ->
  res.render 'home', title: 'Express'

login = (req, res) ->
  res.render 'login', 
    title: 'Login'
    errInfo: false

exports.home = home
exports.login = login
