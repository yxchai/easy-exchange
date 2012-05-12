var mongoose = require('mongoose');
var Category = require('./init.js');

Category.find({}, function(err, doc) {
    if(!err){
        if(doc){
            GLOBAL.category = doc;
        }
    }
});
