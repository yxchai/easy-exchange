var model = require('./dbhandle.js');
var create = {
    username: 'woody',
    group: 0
};

var callback = function(){
    console.log('create success');
};

//model.createUser(create,callback);

var cback = function(err){
    console.log('call backing');
    if(!err){
        console.log('find success');
        //console.log('doc:' + doc._id);
    }else{
        console.log('none found');
    }
};
console.log('now findone');
model.removeUser('4f5f220051e4ceb82e000002',cback);
console.log('findone done');
