var upload = function(req, res) {
    var na = req.files.photo.name;
    na = na + '';
    na = na.split('.');
    na= na[na.length-1];
    var rename = (new Date()).getTime().toString() + '.' + na;
    var path = '../../public/image' + rename;
    require('fs').rename(req.files.photo.path, './public/images/'+rename, function(err) {
        res.send(rename);
    });
};

module.exports = upload;
