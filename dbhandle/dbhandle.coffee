model = require './dbinit.js'
User = model.User
OrderList = model.OrderList

#user handle
UserHandle.createUser = (obj, cb) ->
  tmpUser = new User
  tmpUser.initobj obj
  tmpUser.save(
    (err) ->
      if not err
        console.log 'save success'
        do cb
      else
        console.log 'save failed'
        console.log 'error:#{err}'
  )

UserHandle.removeUser = (id, cb) ->
  conditions = _id: id
  callback = (err) ->
    if not err
      console.log 'remove success'
      do cb
    else
      console.log 'remove failed'
      console.log 'error:#{err}'
  User.remove conditions, callback

UserHandle.queryUser = (name, cb) ->
  console.log 'now queryUser'
  User.findOne username: name, cb
  console.log 'queryUser done'

#book handle
BookHandle.insertBook = (uid, obj, cb) ->
  User.findById uid callback







exports.createUser = createUser
exports.updateUser = updateUser
exports.removeUser = removeUser
exports.queryUser = queryUser

  

  

