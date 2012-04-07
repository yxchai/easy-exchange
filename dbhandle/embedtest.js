var Inside, ObjectId, Outer, Outside, Schema, mongoose;

mongoose = require('mongoose');

Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/embedtest');

Inside = new Schema({
  book: String,
  count: Number
});

Inside.methods.output = function() {
  return console.log(this.count);
};

Outside = new Schema({
  inside: [Inside]
});

Outer = mongoose.model('Outer', Outside);

Outer.findOne({}, function(err, doc) {
  return doc.inside.id('4f7965f3afb18f5e0c000003').output();
});
