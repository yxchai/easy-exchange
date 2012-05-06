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
        return false;
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
        return false;
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
                window.location.href = '/request/show';
            }
        });
        return false;
    });
    $('.reqdel').click(function() {
        var rid = $(this).siblings('.rid').text();
        var buyerid = $(this).siblings('.buyerid').text();
        var sellerid = $(this).siblings('.sellerid').text();
        var that = this;
        $.post('/request/del',{
            rid: rid,
            buyerid: buyerid,
            sellerid: sellerid
        }, function(data) {
            if(data){
                if(data == 'success'){
                    $(that).parent().remove();
                }
            }
        });
        return false;
    });
});
