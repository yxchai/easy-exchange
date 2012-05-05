$(function() {
    $('#addcart').click(function() {
        var count = $('#cartcount').val();
        var bid = $('#bid').val();
        var uid = $('#uid').val();
        var jqxhr = $.post('/cart/add', {
            count: count,
            bid: bid,
            uid: uid
        }, function(data) {
            if(data){
                alert(data);
            }
        });
    });
    $('.cartdel').click(function() {
        var btn = $(this);
        var form = $(this).siblings('form');
        var uid = form.children('.shopuid').val();
        var bid = form.children('.shopbid').val();
        var jqxhr = $.post('/cart/del', {
            uid: uid,
            bid: bid
        }, function(data) {
            if(data){
                alert(data);
                btn.parent().remove();
            }
        });
    });
    $('#cartconfirm').click(function() {
        var arr = [];
        $('.cartitem').each(function() {
            var form = $(this).children('form'),
                count = form.children('.shopcount').val(),
                bid = form.children('.shopbid').val(),
                uid = form.children('.shopuid').val();
            var obj = {
                count: count,
                bid: bid,
                uid: uid
            };
            arr.push(obj);
        });
        $.post('/request/add', {cartitem: arr}, function(data) {
            if(data){
                console.log(data);
            }
        });
    });
});
