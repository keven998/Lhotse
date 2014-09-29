$(function () {
    /*
    * routeList
    * */
    var tab01=$('#tab01'),
        tab02=$('#tab02'),
        item01=$('#item01'),
        item02=$('#item02');
    tab01.on('click',function(e){
        console.dir($(this))
        if(!$(this).hasClass('item01-hover')){
            $(this).addClass('item01-hover').removeClass('item01-normal');
            tab02.removeClass('item02-hover').addClass('item02-normal');
            item01.show();
            item02.hide();
        }else{
            return false;
        }
    })
    tab02.on('click',function(e){
        if(!$(this).hasClass('item02-hover')){
            $(this).addClass('item02-hover').removeClass('item02-normal');
            tab01.removeClass('item01-hover').addClass('item01-normal');
            item02.show();
            item01.hide();
        }else{
            return false;
        }
    })

    item02.find('li').click(function(){
        location.href = $(this).attr("data-url");
    });


})


$(function(){
    var bn = $('p.bn'),
        url = bn.attr('data-url');
    bn.on('click', function(e){
        var cityName = remote_ip_info["city"];

        console.log(bn.attr('data-url'));
        $.ajax({  //动画结束，写入数据
                url    : '/route/city',
                data   : {cityName : cityName},
                dataType : "json",           
                type : 'POST',
                success: function (msg) {
                    var id = msg.id;
                    if (id) {
                        window.location.href= url + id;
                    } else {
                       alert('复制失败'); 
                    }
                                
                },
                error  : function () {
                    alert('复制失败...');
                }
        });
    })
         
})


