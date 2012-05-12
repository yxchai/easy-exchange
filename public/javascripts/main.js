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
                alert('添加成功');
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
        var bookid = $(this).siblings('.bookid').text();
        var count = $(this).siblings('.count').text();
        var that = this;
        $.post('/request/del',{
            rid: rid,
            buyerid: buyerid,
            sellerid: sellerid,
            bookid: bookid,
            count: count
        }, function(data) {
            if(data){
                if(data == 'success'){
                    $(that).parent().remove();
                }
            }
        });
        return false;
    });
    $('.reqconfirm').click(function() {
        var rid = $(this).siblings('.rid').text();
        var buyerid = $(this).siblings('.buyerid').text();
        var sellerid = $(this).siblings('.sellerid').text();
        var bookid = $(this).siblings('.bookid').text();
        var count = $(this).siblings('.count').text();
        var that = this;
        $.post('/request/confirm',{
            rid: rid,
            buyerid: buyerid,
            sellerid: sellerid,
            bookid: bookid,
            count: count
        }, function(data) {
            if(data){
                if(data == 'success'){
                    window.location.href = '/trade/show';
                }else{
                    window.location.reload();
                }
            }
        });
        return false;
    });
    $('#class').change(function() {
        var choosen = $(this).find('option:selected').text();
        var subclass = $('#subclass');
        subclass.children().remove();
        subclass.append('<option value="请稍后">请稍后</option>');
        $.get('/category/search/',{
            qstr: choosen
        },function(data) {
            subclass.children().remove();
            for (var i = 0; i < data.length; i++) {
                subclass.append('<option value=' + data[i].name + '>' + data[i].name + '</option>');
            }
        });
    });
});
