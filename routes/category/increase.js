var dict = {
    fiction: 0,//'小说',
    pop: 1,//'流行',
    culture: 2,//'文化',
    life: 3,//'生活',
    eco: 4,//'经管',
    tech: 5//'科技'
};
var Tag = require('./init');

var increase = function(fclass, sclass) {
    var category = GLOBAL.category[0].category;
    var num = dict[fclass];
    category[num][sclass];
    Tag.findOne({}, function(err, doc) {
        if(!err){
            if(doc){
                doc.category = category;
                doc.markModified('category');
                doc.save();
            }
        }
    });
};

module.exports = increase;
