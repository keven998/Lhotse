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
    var routeList=$('.routelist'),
        sider=$('.sider'),
        layer=$('.layer'),
        wheight=$(window).height();
    /*
    * 将线路列表项的事件委托在外围容器上
    * */
    routeList.on('click','a.c-img,h2,a.btn02-c1',function(e){
        var requestUrl = $(this).parents('li').attr('data-url');//假设单项的数据请求地址写在父级dom li中
        sider.css('height',wheight);
        layer.show();
        sider.show(500,function(){
            $.ajax({
                url    : requestUrl,
                data   : {},
                success: function (msg) {
                    console.dir(msg) //请求成功后，写入dom,打开侧栏、遮罩
                },
                error  : function () {
                    console.log('error!!!')
                }
            });
            layer.on('click',function(e){
                sider.hide(500);
                $(this).hide()
            })
        });
    })
})
