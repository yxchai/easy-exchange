
var search = function(req, res) {
    var category = GLOBAL.category[0].category;
    var query = req.query,
        qstr = query.qstr,
        signal = true;
    for (var i = 0; i < category.length; i++) {
        if(category[i].name === qstr){
            signal = false;
            res.json(category[i].subtag);
        }
    }
    if(signal){
        res.send('error');
    }
};

module.exports = search;
