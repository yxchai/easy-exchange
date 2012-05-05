var checksession = function(bid, cart) {
    for (var i = 0; i < cart.length; i++) {
        if(cart[i].bid == bid){
            return i;
        }
    }
    return false;
};

module.exports = checksession;
