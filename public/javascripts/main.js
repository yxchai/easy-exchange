$(function() {
    $('#addcart').click(function() {
        var count = $('#cartcount').val();
        var bid = $('#bid').val();
        var uid = $('#uid').val();
        var money = $('#money').val();
        var jqxhr = $.post('/cart/add', {
            count: count,
            bid: bid,
            uid: uid,
            money: money
        }, function(data) {
            if(data){
                alert('添加成功');
            }
        });
        return false;
    });
    $('.cartdel').click(function() {
        var btn = $(this);
        var form = $(this).parent().siblings('.shopdiv').children('form');
        var uid = form.children('.shopuid').val();
        var bid = form.children('.shopbid').val();
        var jqxhr = $.post('/cart/del', {
            uid: uid,
            bid: bid
        }, function(data) {
            if(data){
                alert(data);
                btn.parent().parent().remove();
            }
        });
        return false;
    });
    $('#cartconfirm').click(function() {
        var arr = [];
        $('.cartitem').each(function() {
            var form = $(this).children('.shopdiv').children('.shopform'),
                count = form.children('.shopcount').val(),
                bid = form.children('.shopbid').val(),
                uid = form.children('.shopuid').val(),
                money = form.children('.shopmoney').val();
            var obj = {
                count: count,
                bid: bid,
                uid: uid,
                money: money
            };
            arr.push(obj);
            console.log(arr);
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
                    $(that).parent().parent().remove();
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
        var money = $(this).siblings('.money').text();
        var that = this;
        $.post('/request/confirm',{
            rid: rid,
            buyerid: buyerid,
            sellerid: sellerid,
            bookid: bookid,
            count: count,
            money: money
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
    $('#photoupload').submit(function() {
        console.log('click');
        $('#status').text('上传中');
        $(this).ajaxSubmit({
            error: function(xhr) {
                $('#status').text('Error:'+xhr.status);
            },
            success: function(address) {
                var addr = '/images/' + address;
                $('#status').text('上传成功');
                $('#bookimage').val(addr);
                $('#upphoto').attr('src', addr);
            }
        });
        return false;
    });
});


//05a5408ab66dd46510efc1a023497d2f
//GET http://api.douban.com/book/subject/isbn/{isbnID}   alt=json


