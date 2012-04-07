dbhandle = require './dbhandle'
User = dbhandle.UserModel

regerr = (err) ->
  bobj = 
    title: 'Login'
    errInfo: err
  res.render 'login', bobj


savecb = (err) ->
  if not err
    res.redirect '/'
  else
    regerr err

register = (req, res) ->
  body = req.body
  email = body.email;
  pwd = body.password;
  if User.checkEmail email
    tmpuser = new User
    tmpuser.initobj body
    tmpuser.save savecb
  else
    regerr '用户名重复'


exports.register = register
