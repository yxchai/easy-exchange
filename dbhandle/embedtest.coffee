mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId
mongoose.connect 'mongodb://localhost/embedtest'

Inside = new Schema
  book: String
  count: Number

Inside.methods.output = () ->
  console.log @count


Outside = new Schema
  inside: [Inside]


Outer = mongoose.model 'Outer', Outside


Outer.findOne {}, (err, doc) ->
  do doc.inside.id('4f7965f3afb18f5e0c000003').output
